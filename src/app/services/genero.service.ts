import { environment } from './../../environments/environment';
import { Genero } from './../models/genero';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  endereco = `${environment.baseUrl}generos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Genero[]>{
    return this.http.get<Genero[]>(this.endereco);
  }

  inserir(genero?: Genero): Observable<Genero> {
    if (!genero) return EMPTY;
    return this.http.post<Genero>(this.endereco, genero);
  }

  atualizar(genero?: Genero): Observable<Genero> {
    if(!genero) return EMPTY;
    return this.http.put<Genero>(`${this.endereco}/${genero?.id}`, genero);
  }

  remover(id: number): Observable<any> {
    return this.http.delete(`${this.endereco}/${id}`);
  }

}
