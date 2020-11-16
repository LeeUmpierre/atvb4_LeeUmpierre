import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { LocalizacaoEntity } from '../_service/localizacao.service';
import { PassagemEntity, PassagemService } from '../_service/passagem.service';

@Component({
  selector: 'app-passagem',
  templateUrl: './passagem.component.html',
  styleUrls: ['./passagem.component.scss']
})
export class PassagemComponent implements OnInit {

  public displayedColumns: string[] = ['valor', 'dia', 'hora', 'localizacao', 'options'];
  public passagems: PassagemEntity[] = [];
  public localizacoes: LocalizacaoEntity[] = [];

  public errorMessage: string;
  public loading: boolean;

  public passagem: PassagemEntity = new PassagemEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: PassagemService, private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega a lista de passagems
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.passagems = result as [];

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.passagem).subscribe(result => {

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
   * @param passagem 
   */
  public excluir(passagem: PassagemEntity): void {
    
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
        this.service.excluir(passagem.id).subscribe(result => {
          
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
   * Abre o formulário com um novo cliente para inclusão
   */
  public adicionar(): void {
    //Crio um novo objeto e abro o formulario
    this.openSidenav(new PassagemEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param passagem
   */
  public editar(passagem: PassagemEntity): void {
    //Como passagem é passado um objeto da tabela por referencia, 
    //se não foir feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.create(passagem));
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
   * @param passagem 
   */
  private openSidenav(passagem: PassagemEntity): void {
    this.passagem = passagem;
    this.sidenav.open();
  }

}