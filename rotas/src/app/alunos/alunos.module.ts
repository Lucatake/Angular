import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosService } from './alunos.service';
import { AlunosDeactivateGuard } from '../guard/alunos-deactivate-guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlunosRoutingModule
  ],
  exports: [],
  declarations: [
    AlunosComponent,
    AlunoFormComponent
  ],
  providers: [
    AlunosService,
    AlunosDeactivateGuard,
    AlunoDetalheResolver
  ],
})

export class Alunos { }
