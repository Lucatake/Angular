import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private alunos: Aluno[] = [
    {id: 1, nome: 'Aluno 01', email: 'aluno1@email.com'},
    {id: 2, nome: 'Aluno 02', email: 'aluno2@email.com'},
    {id: 3, nome: 'Aluno 03', email: 'aluno3@email.com'},
    {id: 4, nome: 'Aluno 04', email: 'aluno4@email.com'},
  ];

  getAlunos(){
    return this.alunos;
  }

  getAluno(iden: number){
    for(let i = 0; i < this.alunos.length; i++){
      let aluno = this.alunos[i];
      if (aluno.id == iden){
        return aluno;
      }
    }
    return null;
  }

  constructor() { }
}
