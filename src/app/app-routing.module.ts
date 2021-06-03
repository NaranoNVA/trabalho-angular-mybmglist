import { FilmeComponent } from './views/filme/filme.component';
import { JogoComponent } from './views/jogo/jogo.component';
import { LivroComponent } from './views/livro/livro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'jogos', component : JogoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
