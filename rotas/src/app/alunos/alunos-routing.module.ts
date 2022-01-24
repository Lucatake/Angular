import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';


const alunosRoutes: Routes = [
  //hardcoded devem vir primeiro, para a ordem de renderização
  //{ path: 'alunos', component: AlunosComponent },
  //{ path: 'alunos/novo', component: AlunoFormComponent },
  //{ path: 'aluno/:id', component: AlunoDetalheComponent },
  //{ path: 'aluno/:id/edit', component: AlunoFormComponent },
  //usando rotas filhas
  { path: '', component: AlunosComponent, children: [
    { path: 'novo', component: AlunoFormComponent },
    { path: ':id', component: AlunoDetalheComponent },
    { path: ':id/edit', component: AlunoFormComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
