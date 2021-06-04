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

  listar(): Observable<Jogo[]>{
    return this.http.get<Jogo[]>(this.endereco);
  }

  inserir(jogo?: Jogo): Observable<Jogo>{
    if (!jogo) return EMPTY;
    return this.http.post<Jogo>(`${environment.baseUrl}jogos`, jogo);
  }

  atualizar(jogo?: Jogo): Observable<Jogo>{
    if (!jogo) return EMPTY;
    return this.http.put<Jogo>(`${environment.baseUrl}jogos/${jogo.id}`, jogo);
  }

  remover(id: number): Observable<any>{
    return this.http.delete(`${environment.baseUrl}jogos/${id}`);
  }
}
