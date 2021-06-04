import { environment } from './../../environments/environment';
import { Jogo } from './../models/jogo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JogoService {

  endereco = `${environment.baseUrl}jogos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Jogo[]>{
    return this.http.get<Jogo[]>(this.endereco);
  }
}
