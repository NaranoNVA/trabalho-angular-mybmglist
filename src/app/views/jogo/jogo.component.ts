import { JogoService } from './../../services/jogo.service';
import { Jogo } from 'src/app/models/jogo';
import { GeneroService } from './../../services/genero.service';
import { Genero } from 'src/app/models/genero';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, AfterViewInit, Component, OnInit,  ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit, AfterContentChecked, AfterViewInit, AfterViewInit {

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
  sort!: (compareFn?: ((a: Jogo, b: Jogo) => number) | undefined) => Jogo[];

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private jogoService: JogoService, private snackBar: MatSnackBar, private GeneroService: GeneroService) { }

  ngOnInit(): void {
    this.listar();
    this.preencherArray();
  }

  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    this.jogos.sort = this.sort;
  }

  ngAfterContentChecked(): void {
    this.aplicaCor();
  }

  mostrarSnackBar(msg: string): void{
    this.snackBar.open(msg, '', {duration: 3000});
  }

  //Preenche a lista de gêneros cadastrados
  preencherArray(): void{
    this.GeneroService.listar().subscribe(
      generos => {
        this.generos = generos;
        console.log(this.generos);
      }
    );
  }

  //Muda a cor do texto da nota de acordo com o seu valor
  aplicaCor(): void {
    //Pega todas as notas e estados atraves do Id | o ^= requer apenas que o valor esteja incluido no Id
    const notas =  document.querySelectorAll('[id^="nota"]');
    const estado =  document.querySelectorAll('[id^="status"]');
    //Percorre todas as notas e aplica um id unico
    for (let i = 0; i < notas.length; i++){
      notas[i].id = 'nota-' + i;
    }
    //Percorre todas as notas de acordo com numero de jogos adicionados e aplica a classe de acordo com a nota
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

    //Percorre todas os estados e aplica um id unico
    for (let i = 0; i < estado.length; i++){
      estado[i].id = 'estado-' + i;
    }
    //Percorre todas os estados de acordo com numero de jogos adicionados e aplica a classe de acordo o estado
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

  //Filtro de ordenação dos jogos
  filtra(): void{
    this.jogos.sort();
    console.log(this.jogos);
  }

  //Lista os jogos cadastrados
  listar(): void{
    this.jogoService.listar().subscribe(
      jogos => {
        this.jogos = jogos;
      },
      error => {
        const e = error as HttpErrorResponse;
        console.log(e);
        this.mostrarSnackBar('Erro ao listar os jogos! Tente novamente mais tarde!');
      });
  }

  ordena(): void{
    this.jogoService.listar().subscribe(
      jogos => {
        this.jogos = jogos.reverse();
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

  //Seleciona um jogo na lista
  // tslint:disable-next-line: typedef
  selecionar(jogo: Jogo) {
    this.jogoSelecionado = jogo;
    this.inserindo = false;
  }

  //Cancela a exibição dos campos para preenchimento
  // tslint:disable-next-line: typedef
  cancelar() {
    this.jogo = undefined;
    this.listar();
  }

  //Exibe os campos para cadastrar um novo jogo
  novo(): void{
    this.jogo = new Jogo();
    this.inserindo = false;
  }

  //Salva um novo jogo ou edita um existente
  // tslint:disable-next-line: typedef
  salvar() {
    if (!this.inserindo){
      this.inserir();
    } else {
      this.atualizar();
    }
  }

  //Adiciona um novo jogo
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

  //Atualiza os dados de um jogo existente
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

  //Inciliza novJogo para preenchimento.
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

  //Exclui um jogo existente
  // tslint:disable-next-line: typedef
  remover(id: number){
    this.jogoService.remover(id).subscribe( () => {
      this.listar();
    },
    error => {
      this.mostrarSnackBar(error);
    });
  }

  //Abre os campos para edição de um jogo existente
  // tslint:disable-next-line: typedef
  editar(jogo: Jogo){
    this.jogo = jogo;
    this.inserindo = true;
  }
}
