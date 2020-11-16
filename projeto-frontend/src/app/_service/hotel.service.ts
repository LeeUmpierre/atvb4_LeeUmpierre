import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalizacaoEntity } from './localizacao.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as hoteis disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/hoteis');
  }

  /**
   * Fornece a hotel com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
      return this.http.get(environment.urlSaaS +'/hoteis/'+ id);
    //... ou, assim:
    // return this.http.get(`${environment.urlSaaS}/hoteis/${id}`);
  }

  /**
   * Exclui a hotel com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/hoteis/'+ id);
  }

  /**
   * Verifica se existe um ID na hotel passada por parametro.
   * Se existir, significa que a hotel deverá ser alterada,
   * caso contrário, significa que a hotel será incluída
   * 
   * @param hotel 
   */
  public salvar(hotel: HotelEntity) {
    if (hotel.id) {
      return this.alterar(hotel);
    } else {
      return this.adicionar(hotel);
    }
  }

  /**
   * Adiciona uma nova hotel 
   * 
   * @param hotel 
   */
  private adicionar(hotel: HotelEntity) {
    return this.http.post(environment.urlSaaS +'/hoteis', hotel);
  }

  /**
   * Altera a hotel passada por parâmetro
   * 
   * @param hotel 
   */
  private alterar(hotel: HotelEntity) {
    return this.http.put(environment.urlSaaS +'/hoteis/'+ hotel.id, hotel);
  }
}

export class HotelEntity {
  id: number;
  checkin: Date;
  checkout: Date;
  valor: number;
  localizacao: LocalizacaoEntity;
}