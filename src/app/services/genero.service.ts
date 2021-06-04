import { environment } from './../../environments/environment';
import { Genero } from './../models/genero';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  endereco = `${environment.baseUrl}generos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Genero[]>{
    return this.http.get<Genero[]>(this.endereco);
  }
}
