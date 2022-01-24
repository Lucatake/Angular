import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosService } from './alunos.service';


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
  providers: [AlunosService],
})

export class Alunos { }
