import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Aluno } from '../aluno';

import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  aluno: Aluno = {id: 0, nome: '', email: ''};
  inscricao: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
  ) { }

  editarContato(){
    this.router.navigate(['/alunos', this.aluno.id, 'edit']);
  }

  ngOnInit(){
   /* this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.aluno = this.alunosService.getAluno(id);
      }
    );*/

    this.inscricao = this.route.data.subscribe(
      (info) => {
        this.aluno = info['aluno'];
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
