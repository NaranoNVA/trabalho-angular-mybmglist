import { JogoService } from './../../services/jogo.service';
import { Jogo } from 'src/app/models/jogo';
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
  colunas = ['nome', 'sinopse', 'generos', 'estado', 'action'];
  jogoSelecionado?: Jogo = undefined;
  inserindo = false;

  constructor(private jogoService: JogoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();
  }

  mostrarSnackBar(msg: string): void{
    this.snackBar.open(msg, '', {duration: 3000});
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
    this.jogoSelecionado = undefined;
    this.listar();
  }

  salvar() {
    if (this.inserindo){
      this.inserir();
    } else {
      this.atualizar();
    }
  }

  private inserir(){
    this.jogoService.inserir(this.jogoSelecionado).subscribe(() => {
      this.cancelar();
      this.mostrarSnackBar('Usuário inserido com sucesso');
    },
    error => {
      this.handleServiceError(error);
    });
}
}
