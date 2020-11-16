import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { LocalizacaoEntity, LocalizacaoService } from '../_service/localizacao.service';
import { UsuarioEntity, UsuarioService } from '../_service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'] 
})
export class UsuarioComponent implements OnInit {

  public displayedColumns: string[] = ['nome', 'email', 'localizacao', 'options'];
  public usuarios: UsuarioEntity[] = [];
  public localizacoes: LocalizacaoEntity[] = [];

  public errorMessage: string;
  public loading: boolean;

  public usuario: UsuarioEntity = new UsuarioEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: UsuarioService, private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private localizacaoService: LocalizacaoService) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carregaa lista de usuarios
    this.loadUsuarios();
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.usuario).subscribe(result => {

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
   * @param usuario 
   */
  public excluir(usuario: UsuarioEntity): void {
    
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
        this.service.excluir(usuario.id).subscribe(result => {
          
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
   * Abre o formulário com um novo usuario para inclusão
   */
  public adicionar(): void {
    //Crio um novo objeto e abro o formulario
    this.openSidenav(new UsuarioEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param usuario
   */
  public editar(usuario: UsuarioEntity): void {
    //Como usuario é passado um objeto da tabela por referencia, 
    //se não foir feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.create(usuario));
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
   * @param usuario 
   */
  private openSidenav(usuario: UsuarioEntity): void {
    this.usuario = usuario;
    this.sidenav.open();
  }
  
  /**
   * Carrega a lista de tabelas preços
   */

  /**
   * Carrega a lista de usuarios
   */
  private loadUsuarios(): void {
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.usuarios = result as [];
      

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });
  }

}