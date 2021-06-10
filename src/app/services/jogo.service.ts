import { environment } from './../../environments/environment';
import { Jogo } from './../models/jogo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JogoService {

  endereco = `${environment.baseUrl}jogos`;

  constructor(private http: HttpClient) { }

  //Método para recuperar os jogos do JSON
  listar(): Observable<Jogo[]>{
    return this.http.get<Jogo[]>(this.endereco);
  }

  listarGenero(): Observable<Jogo['generos']>{
    return this.http.get<Jogo['generos']>(this.endereco);
  }

  //Método para inserir um novo jogo no JSON 
  inserir(jogo?: Jogo): Observable<Jogo>{
    if (!jogo) { return EMPTY; }
    return this.http.post<Jogo>(`${environment.baseUrl}jogos`, jogo);
  }

  //Método para salvar a edição de um jogo no JSON
  atualizar(jogo?: Jogo): Observable<Jogo>{
    if (!jogo) { return EMPTY; }
    return this.http.put<Jogo>(`${environment.baseUrl}jogos/${jogo.id}`, jogo);
  }

  //Método para excluir um jogo do JSON
  remover(id: number): Observable<any>{
    return this.http.delete(`${environment.baseUrl}jogos/${id}`);
  }

}
