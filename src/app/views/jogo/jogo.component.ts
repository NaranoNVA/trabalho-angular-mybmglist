import { JogoService } from './../../services/jogo.service';
import { Jogo } from 'src/app/models/jogo';
import { GeneroService } from './../../services/genero.service';
import { Genero } from 'src/app/models/genero';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  jogos = new Array<Jogo>();
  jogo?: Jogo;
  colunas = ['nome', 'sinopse', 'generos', 'estado', 'review','nota','action'];
  cor = '';
  generos = new Array<Genero>();

  jogoSelecionado?: Jogo = undefined;
  inserindo = false;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private jogoService: JogoService, private snackBar: MatSnackBar, private GeneroService: GeneroService) { }

  ngOnInit(): void {
    this.listar();
    this.preencherArray();
  }

  mostrarSnackBar(msg: string): void{
    this.snackBar.open(msg, '', {duration: 3000});
  }

  preencherArray(): void{
    this.GeneroService.listar().subscribe(
      generos => {
        this.generos = generos;
        console.log(this.generos);
      }
    );
  }

  listar(): void{
    this.jogoService.listar().subscribe(
      jogos => {
        this.jogos = jogos;
        console.log(this.jogos);
      },
      error => {
        const e = error as HttpErrorResponse;
        console.log(e);
        this.mostrarSnackBar('Erro ao listar os jogos! Tente novamente mais tarde!');
      });
  }

  
  
  private handleServiceError(error: any): void{
    const e = error as HttpErrorResponse;
    console.log(e);
    this.mostrarSnackBar(e.statusText);
  }

  selecionar(jogo: Jogo) {
    this.jogoSelecionado = jogo;
    this.inserindo = false;
  }

  cancelar() {
    this.jogo = undefined;
    this.listar();
  }

  novo(): void{
    this.jogo = new Jogo();
    this.inserindo = false;
  }

  salvar() {
    if (!this.inserindo){
      this.inserir();
    } else {
      this.atualizar();
    }
  }

  private inserir(){
    this.jogoService.inserir(this.jogo).subscribe(() => {
      this.mostrarSnackBar('Jogo inserido com sucesso');
      this.listar();
      this.cancelar();
    },
    error => {
      this.handleServiceError(error);
    });
  }

  private atualizar(){
    this.jogoService.atualizar(this.jogo).subscribe(() => {
      this.cancelar();
      this.mostrarSnackBar('Jogo Atualizado');
      this.listar();
    },
    error => {
      this.handleServiceError(error);
    });
  }

  criar() {
    this.inserindo = true;
    this.jogoSelecionado = {
      id: undefined,
      nome: '',
      sinopse: '',
      generos: '',
      nota: '',
      estado: '',
      review: ''
    };
  }

  remover(id: number){
    this.jogoService.remover(id).subscribe(()=>{
      this.listar();
    },
    error => {
      this.mostrarSnackBar(error);
    });
  }

  editar(jogo: Jogo){
    this.jogo = jogo;
    this.inserindo = true;
  }
}
