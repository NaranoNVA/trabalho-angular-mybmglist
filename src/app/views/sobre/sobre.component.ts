import { Component, OnInit } from '@angular/core';
import { JogoService } from './../../services/jogo.service';
import { Jogo } from 'src/app/models/jogo';
import { GeneroService } from './../../services/genero.service';
import { Genero } from 'src/app/models/genero';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  constructor(private jogoService: JogoService, private snackBar: MatSnackBar) { }

  jogos = new Array<Jogo>();
  jogo?: Jogo;
  cor = '';
  generos = new Array<Genero>();
  numJogados?: number;
  numTenho?: number;
  numQuero?: number;
  generoMaisJogado?: any;

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
        this.filtraZerados();
        this.filtraTenho();
        this.filtraQuero();
        this.calculaGenero();
      },
      error => {
        const e = error as HttpErrorResponse;
        console.log(e);
        this.mostrarSnackBar('Erro ao listar os jogos! Tente novamente mais tarde!');
      });
  }

  private calculaGenero(): void{
    
  }

  private filtraZerados(): void{
    this.numJogados = this.jogos.filter(jogo => jogo.estado === 'Zerei').length;
  }

  private filtraTenho(): void{
    this.numTenho = this.jogos.filter(jogo => jogo.estado === 'Tenho').length;
  }

  private filtraQuero(): void{
    this.numQuero = this.jogos.filter(jogo => jogo.estado === 'Quero').length;
  }
}
