import { GeneroService } from './../../services/genero.service';
import { Genero } from './../../models/genero';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  generos = new Array<Genero>();
  genero?: Genero;
  colunas = ['id', 'nome', 'action'];

  constructor(private generoService: GeneroService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();
  }

  mostrarSnackBar(msg: string): void{
    this.snackBar.open(msg, '', {duration: 3000});
  }

  listar(): void{
    this.generoService.listar().subscribe(
      generos => {
        this.generos = generos;
        console.log(this.generos);
      },
      error => {
        const e = error as HttpErrorResponse;
        console.log(e);
        this.mostrarSnackBar('Erro ao listar os generos! Tente novamente mais tarde!');
      });
  }

}
