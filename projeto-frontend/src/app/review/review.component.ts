import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioEntity, UsuarioService } from '../_service/usuario.service';
import { ReviewEntity, ReviewService } from '../_service/review.service';
import { HotelEntity, HotelService } from '../_service/hotel.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  public displayedColumns: string[] = [ 'comentario', 'avaliacao', 'usuario', 'hotel', 'options'];
  public reviews: ReviewEntity[] = [];
  public hotel: HotelEntity [] = [];
  public usuarios: UsuarioEntity[] = [];

  public dataSource = new MatTableDataSource<ReviewEntity>();

  public errorMessage: string;
  public loading: boolean;

  public review: ReviewEntity = new ReviewEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: ReviewService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private usuarioService: UsuarioService, private hotelService: HotelService) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;    

    //Carrega lista de usuarios
    this.loadUsuarios();

    //Carrega lista de reviews
    this.loadReviews();
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.review).subscribe(result => {

      //Deu tudo certo, então avise o usuário...
      this.snackBar.open('Registro salvo com sucesso!', '', {
        duration: 3500
      });

    }, error => {
      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Não foi possível salvar o registro!', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, 
      //oculta a barra de progresso...
      this.loading = false;

      //... e fecha a sidenav com o formulário
      this.sidenav.close();
    })
  }

  /**
   * Chama a janela de confirmação de exclusão, se usuário confirmar
   * chama evento de exclusão da service.
   * 
   * @param review 
   */
  public excluir(review: ReviewEntity): void {
    
    //Mostra a janela modal de confirmação
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: new ConfirmDialogOption('Excluir Registro', 'Deseja realmente exluir o registro?', 'warn')
    });

    //Depois de fechado (clicado em cancelar ou confirmar)...
    dialogRef.afterClosed().subscribe(result => {
      
      //Se confirmou, exclui o registro
      if (result) {
        this.service.excluir(review.id).subscribe(result => {
          
          //Deu certo, avisa o usuário...
          this.snackBar.open('Registro excluído com sucesso!', '', {
            duration: 3500
          });

        }, error => {
          
          //Se ocorreu algum erro neste processo, mostra mensagem para usuário
          this.showError('Não foi possível excluir o registro!', error);

        }).add(() => {
          
          //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
          this.loading = false;

        });
      }
    });
  }

  /**
   * Abre o formulário com um novo review para inclusão
   */
  public adicionar(): void {
    //Crio um novo objeto e abro o formulario
    this.openSidenav(new ReviewEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param review
   */
  public visualizar(review: ReviewEntity): void {
    //Como review é passado um objeto da tabela por referencia, 
    //se não foir feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.create(review));
  }

  /**
   * Função responsável por carregar um item no select, comparando
   * os dois parametros se possuem ID's identicos. 
   * 
   * @param item1 
   * @param item2 
   */
  public compareOptions(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  /**
   * Funçao responsável por aplicar um filtro na tabela
   * 
   * @param event 
   */
  public applyFilter(event: Event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  /**
   * Função responsável por mostrar uma mensagem de erro padrão.
   * @param text
   * @param error 
   */
  private showError(text: string, error: any): void {
    //Mostra a snackbar com fundo customizado (vermelho)
    this.snackBar.open(text, '', {
      duration: 5000,
      panelClass: 'snakWarn'
    });

    //Adiciona a mensagem de erro no painel de erro
    this.errorMessage = (error.status == 0) ? 'Não foi possível conectar ao servidor' : error.message;
  }

  /**
   * Dá um open na sidnav exibindo o formulário com os dados 
   * da objeto passado por parâmetro.
   * 
   * @param review 
   */
  private openSidenav(review: ReviewEntity): void {
    this.review = review;
    this.sidenav.open();
  }

  /**
   * Carrega a lista de usuarios
   */
  private loadUsuarios(): void {
    this.loading = true;

    this.usuarioService.listarTodos().subscribe(result => {
      
      //Alimenta o vetor com as usuarios
      this.usuarios = result as [];

    }, error => {
      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);
    }).add(() => {
      this.loading = false;
    });
  }

  /**
   * Carrega a lista de reviews
   */
  private loadReviews(): void {
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.reviews = result as [];

      this.dataSource.data = this.reviews;

      this.dataSource.filterPredicate = (data: ReviewEntity, filter: string) => {
        return data.usuario.nome.toLowerCase().includes(filter);
      };
      

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });
  }
}