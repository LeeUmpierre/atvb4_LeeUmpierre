import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as localizacoes disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/localizacoes');
  }

  /**
   * Fornece a localizacao com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
      return this.http.get(environment.urlSaaS +'/localizacoes/'+ id);
    //... ou, assim:
    // return this.http.get(`${environment.urlSaaS}/localizacoes/${id}`);
  }

  /**
   * Exclui a localizacao com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/localizacoes/'+ id);
  }

  /**
   * Verifica se existe um ID na localizacao passada por parametro.
   * Se existir, significa que a localizacao deverá ser alterada,
   * caso contrário, significa que a localizacao será incluída
   * 
   * @param localizacao 
   */
  public salvar(localizacao: LocalizacaoEntity) {
    if (localizacao.id) {
      return this.alterar(localizacao);
    } else {
      return this.adicionar(localizacao);
    }
  }

  /**
   * Adiciona uma nova localizacao 
   * 
   * @param localizacao 
   */
  private adicionar(localizacao: LocalizacaoEntity) {
    return this.http.post(environment.urlSaaS +'/localizacoes', localizacao);
  }

  /**
   * Altera a localizacao passada por parâmetro
   * 
   * @param localizacao 
   */
  private alterar(localizacao: LocalizacaoEntity) {
    return this.http.put(environment.urlSaaS +'/localizacoes/'+ localizacao.id, localizacao);
  }
}

export class LocalizacaoEntity {
  id: number;
  cidade: string;
  uf: string;
  pais: string;
}