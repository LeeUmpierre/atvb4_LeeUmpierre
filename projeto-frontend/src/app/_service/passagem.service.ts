import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalizacaoEntity } from './localizacao.service';

@Injectable({
  providedIn: 'root'
})
export class PassagemService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as passagens disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/passagens');
  }

  /**
   * Fornece a passagem com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
      return this.http.get(environment.urlSaaS +'/passagens/'+ id);
    //... ou, assim:
    // return this.http.get(`${environment.urlSaaS}/passagens/${id}`);
  }

  /**
   * Exclui a passagem com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/passagens/'+ id);
  }

  /**
   * Verifica se existe um ID na passagem passada por parametro.
   * Se existir, significa que a passagem deverá ser alterada,
   * caso contrário, significa que a passagem será incluída
   * 
   * @param passagem 
   */
  public salvar(passagem: PassagemEntity) {
    if (passagem.id) {
      return this.alterar(passagem);
    } else {
      return this.adicionar(passagem);
    }
  }

  /**
   * Adiciona uma nova passagem 
   * 
   * @param passagem 
   */
  private adicionar(passagem: PassagemEntity) {
    return this.http.post(environment.urlSaaS +'/passagens', passagem);
  }

  /**
   * Altera a passagem passada por parâmetro
   * 
   * @param passagem 
   */
  private alterar(passagem: PassagemEntity) {
    return this.http.put(environment.urlSaaS +'/passagens/'+ passagem.id, passagem);
  }
}

export class PassagemEntity {
  id: number;
  dia: Date;
  hora: Date;
  valor: number;
  localizacao: LocalizacaoEntity;
}