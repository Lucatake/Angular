import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosGuard } from '../guard/alunos-guard';
import { AlunosDeactivateGuard } from '../guard/alunos-deactivate-guard';


const alunosRoutes: Routes = [
  //hardcoded devem vir primeiro, para a ordem de renderização
  //{ path: 'alunos', component: AlunosComponent },
  //{ path: 'alunos/novo', component: AlunoFormComponent },
  //{ path: 'aluno/:id', component: AlunoDetalheComponent },
  //{ path: 'aluno/:id/edit', component: AlunoFormComponent },
  //usando rotas filhas
  { path: '', component: AlunosComponent,
  //definindo apenas para as rotas filhas
  canActivateChild: [AlunosGuard],
  children: [
    { path: 'novo', component: AlunoFormComponent, canDeactivate: [AlunosDeactivateGuard] },
    { path: ':id', component: AlunoDetalheComponent, canDeactivate: [AlunosDeactivateGuard] },
    { path: ':id/edit', component: AlunoFormComponent, canDeactivate: [AlunosDeactivateGuard] },

  ]},

];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule { }
