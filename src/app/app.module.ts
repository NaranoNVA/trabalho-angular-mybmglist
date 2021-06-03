import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LivroComponent } from './views/livro/livro.component';
import { JogoComponent } from './views/jogo/jogo.component';
import { FilmeComponent } from './views/filme/filme.component';

@NgModule({
  declarations: [
    AppComponent,
    LivroComponent,
    JogoComponent,
    FilmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
