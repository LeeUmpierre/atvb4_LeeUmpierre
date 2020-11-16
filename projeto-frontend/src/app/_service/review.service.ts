import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioEntity } from './usuario.service';
import { HotelEntity } from './hotel.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as reviews disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/reviews');
  }

  /**
   * Fornece a review com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
      return this.http.get(environment.urlSaaS +'/reviews/'+ id);
  }

  /**
   * Exclui a review com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/reviews/'+ id);
  }

  /**
   * Verifica se existe um ID na review passada por parametro.
   * Se existir, significa que a review deverá ser alterada,
   * caso contrário, significa que a review será incluída
   * 
   * @param review 
   */
  public salvar(review: ReviewEntity) {
    if (review.id) {
      return this.alterar(review);
    } else {
      return this.adicionar(review);
    }
  }

  /**
   * Adiciona uma nova review 
   * 
   * @param review 
   */
  private adicionar(review: ReviewEntity) {
    return this.http.post(environment.urlSaaS +'/reviews', review);
  }

  /**
   * Altera a review passada por parâmetro
   * 
   * @param review 
   */
  private alterar(review: ReviewEntity) {
    return this.http.put(environment.urlSaaS +'/reviews/'+ review.id, review);
  }
}

export class ReviewEntity {
  id: number;
  comentario: string;
  avaliacao: number;
  hotel: HotelEntity;
  usuario: UsuarioEntity;
}