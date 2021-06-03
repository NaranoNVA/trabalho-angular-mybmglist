import { Genero } from './genero';
export class Jogo {
  id?: number;
  nome: string;
  sinopse: string;
  generos: Array<Genero>;
  nota: number;
  estado: string;
  review: string;

  constructor(nome: string, sinopse: string, generos: Array<Genero>, nota: number, estado: string, review: string){
    this.nome = nome;
    this.sinopse = sinopse;
    this.generos = generos;
    this.nota = nota;
    this.estado = estado;
    this.review = review;
  }
}
