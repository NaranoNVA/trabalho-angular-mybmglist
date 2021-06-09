import { JogoService } from './../../services/jogo.service';
import { Jogo } from 'src/app/models/jogo';
import { GeneroService } from './../../services/genero.service';
import { Genero } from 'src/app/models/genero';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit, AfterContentChecked {

  jogos = new Array<Jogo>();
  jogo?: Jogo;
  colunas = ['nome', 'sinopse', 'generos', 'estado', 'review', 'nota', 'action'];
  cor = '';
  generos = new Array<Genero>();
  genero?: Genero;
  jogoSelecionado?: Jogo = undefined;
  inserindo = false;
  teste?: undefined;
  numJogados?: number;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private jogoService: JogoService, private snackBar: MatSnackBar, private GeneroService: GeneroService) { }

  ngOnInit(): void {
    this.listar();
    this.preencherArray();
  }

  ngAfterContentChecked(): void {
    this.aplicaCor();
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

  aplicaCor(): void {
    const notas =  document.querySelectorAll('[id^="nota"]');
    const estado =  document.querySelectorAll('[id^="status"]');
    for (let i = 0; i < notas.length; i++){
      notas[i].id = 'nota-' + i;
    }
    for (let i = 0; i < this.jogos.length; i++){
      const nota = document.getElementById('nota-' + i );
      const notaNumber = Number(nota?.innerText);
      if (notaNumber <= 5){
        nota?.classList.add('notaBaixa');
      } else if (notaNumber >= 5 && notaNumber <= 8){
        nota?.classList.add('notaMedia');
      } else{
        nota?.classList.add('notaAlta');
      }
    }

    for (let i = 0; i < estado.length; i++){
      estado[i].id = 'estado-' + i;
    }
    for (let i = 0; i < this.jogos.length; i++){
      // tslint:disable-next-line: no-shadowed-variable
      const estado = document.getElementById('estado-' + i );
      const estadoValue = String(estado?.innerText);
      if (estadoValue === 'Quero'){
        estado?.classList.add('quero');
      } else if (estadoValue === 'Zerei'){
        estado?.classList.add('zerei');
      } else{
        estado?.classList.add('tenho');
      }
    }
  }

  filtra(): void{
    this.jogos.sort();
    console.log(this.jogos);
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

  // tslint:disable-next-line: typedef
  selecionar(jogo: Jogo) {
    this.jogoSelecionado = jogo;
    this.inserindo = false;
  }

  // tslint:disable-next-line: typedef
  cancelar() {
    this.jogo = undefined;
    this.listar();
  }

  novo(): void{
    this.jogo = new Jogo();
    this.inserindo = false;
  }

  // tslint:disable-next-line: typedef
  salvar() {
    if (!this.inserindo){
      this.inserir();
    } else {
      this.atualizar();
    }
  }

  // tslint:disable-next-line: typedef
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

  // tslint:disable-next-line: typedef
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

  // tslint:disable-next-line: typedef
  criar() {
    this.inserindo = true;
    this.jogoSelecionado = {
      id: undefined,
      nome: '',
      sinopse: '',
      generos: '',
      nota: 0,
      estado: '',
      review: ''
    };
  }

  // tslint:disable-next-line: typedef
  remover(id: number){
    this.jogoService.remover(id).subscribe( () => {
      this.listar();
    },
    error => {
      this.mostrarSnackBar(error);
    });
  }

// tslint:disable-next-line: typedef
  editar(jogo: Jogo){
    this.jogo = jogo;
    this.inserindo = true;
  }
}
