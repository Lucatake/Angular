import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit, OnDestroy{

  id: number = 0;
  inscricao: Subscription = new Subscription;
  curso: any = '';

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private router: Router) {
    //não ouve o evento e então não atualiza automatico
    //this.id = this.route.snapshot.params['id'];

  }

  ngOnInit() {
    //subscribe nos eventos para realizar atualizações
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.curso = this.cursosService.getCurso(this.id);

        if(this.curso == null){
          this.router.navigate(['/cursos/naoEncontrado']);
        }
      }
    );
  }
  ngOnDestroy() {
      this.inscricao.unsubscribe();
  }
}
