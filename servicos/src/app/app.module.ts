import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosService } from './cursos/cursos.service';
import { CriaCursoModule } from './criar-curso/criar-curso.module';
import { CursosModule } from './cursos/cursos.module';
import { ReceberCursoCriadoComponent } from './receber-curso-criado/receber-curso-criado.component';
import { LogService } from './shared/log.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //criando modulos com mesmo serviço, ainda gera uma instância (padrão Singleton)
    //escopos declarados para os modulos apenas
    CriaCursoModule,
    CursosModule
  ],
  //colocada no providers gera a criação de apenas uma instância do serviço
  //pode ser usada em mais de uma classe
  //declarado para toda aplicação
  //providers: [CursosService],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
