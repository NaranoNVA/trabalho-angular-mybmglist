import { SobreComponent } from './views/sobre/sobre.component';
import { GeneroComponent } from './views/genero/genero.component';
import { JogoComponent } from './views/jogo/jogo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'generos', component : GeneroComponent },
  { path: 'sobre', component : SobreComponent },
  { path: 'jogos', component : JogoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
