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
  modoEdicao = false;

  colunas = ['nome', 'icone', 'acoes'];

  constructor(private generoService: GeneroService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();
  }

  mostrarSnackBar(msg: string): void{
    this.snackBar.open(msg, '', {duration: 3000});
  }

  //Lista os gêneros cadastrados
  listar(): void{
    this.generoService.listar().subscribe(
      generos => {
        this.generos = generos.reverse();
      },
      error => {
        const e = error as HttpErrorResponse;
        console.log(e);
        this.mostrarSnackBar('Erro ao listar os generos! Tente novamente mais tarde!');
      });
  }

  //Exibe os campos para criação de novo gênero
  novo(): void{
    this.genero = new Genero();
    this.modoEdicao = false;
  }

  //Cancela a operação de criação de novo gênero
  cancelar(): void {
    this.genero = undefined;
    this.listar();
  }

  //Salva um novo gênero ou atualiza um existente
  salvar(): void {
    if ( !this.modoEdicao ){
      this.generoService.inserir(this.genero).subscribe( genero => {
        this.listar();
        this.genero = undefined;
        this.mostrarSnackBar('Gênero adicionado com sucesso!');
      });
    }
    else
    {
      this.generoService.atualizar(this.genero).subscribe( genero => {
        this.listar();
        this.genero = undefined;
        this.mostrarSnackBar('Género atualizado com sucesso!');
      });
    }
  }

  //Exibe os campos para edição de um gênero
  atualizar(genero: Genero): void{
    this.genero = genero;
    this.modoEdicao = true;
  }


  //Exclui um gênero específico
  excluir(id?: number): void{
    if (!id) { return; }
    this.generoService.remover(id).subscribe(() => {
      this.listar();
      this.mostrarSnackBar('Género removido com sucesso!');
    });
  }
}
