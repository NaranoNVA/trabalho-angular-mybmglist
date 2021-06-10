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

  //Método para recuperar os gêneros do JSON
  listar(): Observable<Genero[]>{
    return this.http.get<Genero[]>(this.endereco);
  }

  //Método para inserir um novo gênero no JSON
  inserir(genero?: Genero): Observable<Genero> {
    if (!genero) return EMPTY;
    return this.http.post<Genero>(this.endereco, genero);
  }

  //Método para salvar a edição de um gênero no JSON
  atualizar(genero?: Genero): Observable<Genero> {
    if(!genero) return EMPTY;
    return this.http.put<Genero>(`${this.endereco}/${genero?.id}`, genero);
  }

  //Método para excluir um gênero no JSON
  remover(id: number): Observable<any> {
    return this.http.delete(`${this.endereco}/${id}`);
  }

}
