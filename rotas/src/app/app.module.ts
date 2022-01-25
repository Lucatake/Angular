import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import 'materialize-css';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guard/auth-guard';
import { CursosGuard } from './guard/cursos-guard';
import { AlunosGuard } from './guard/alunos-guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { Cursos } from './cursos/cursos.module';
//import { Alunos } from './alunos/alunos.module';
//import { AlunoDetalheComponent } from './alunos/aluno-detalhe/aluno-detalhe.component';
//import { AlunosComponent } from './alunos/alunos.component';
//import { CursosComponent } from './cursos/cursos.component';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursosService } from './cursos/cursos.service';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    //CursosComponent,
    CabecalhoComponent,
    PaginaNaoEncontradaComponent,
    //AlunoDetalheComponent,
    //AlunosComponent,
    //CursoDetalheComponent,
    //CursoNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
    //Cursos,
    //Alunos
  ],
  providers: [
    AuthService,
    AuthGuard,
    CursosGuard,
    AlunosGuard
    //CursosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
