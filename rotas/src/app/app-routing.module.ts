import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth-guard';
import { CursosGuard } from './guard/cursos-guard';
import { AlunosGuard } from './guard/alunos-guard';
//import { CursosComponent } from './cursos/cursos.component';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  //lazy loading
  { path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.Cursos),
    canActivate: [AuthGuard],
    canActivateChild: [CursosGuard]},
  { path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(m => m.Alunos),
    canActivate: [AuthGuard],
    //canActivateChild: [AlunosGuard]
  },
  //{ path: 'cursos', component: CursosComponent },
  //{ path: 'curso/:id', component: CursoDetalheComponent },
  //{ path: 'naoencontrado', component: CursoNaoEncontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
