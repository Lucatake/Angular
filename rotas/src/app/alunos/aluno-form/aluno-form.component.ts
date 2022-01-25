import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { IFormDeactivate } from 'src/app/guard/iform-deactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, IFormDeactivate {

  aluno: any = {};
  inscricao: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService
  ) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.aluno = this.alunosService.getAluno(id);
        if(this.aluno === null){
          this.aluno = {};
        }
      }
    )
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  formMudou: boolean = false;

  onInput(){
    this.formMudou = true;
  }

  podeMudarRota(){
    if (this.formMudou){
      confirm('Tem certeza que deseja sair da página?');
    }
    return true;
  }

  podeDesativar() {
    return this.podeMudarRota();
  }
}
