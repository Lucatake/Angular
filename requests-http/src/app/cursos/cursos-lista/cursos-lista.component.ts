import { catchError, tap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { empty, Observable, Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {

  deleteModalRef: BsModalRef= new BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;
  cursoSelecionado!: Curso;
  //bsModalRef: BsModalRef= new BsModalRef;
  //cursos: Curso[] = [];
  cursos$: Observable<Curso[]> = new Observable;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //subscribe manual - necessário desincrever para não sobrecarregar
    /*this.service.list()
    .pipe(
      tap(console.log)
    )
    .subscribe(dados => this.cursos = dados);*/

    this.onRefresh();
  }
  onRefresh(){
    //pipe async - inscrição automatica
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.log(error);
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    );

    //maneiras alternativas
    /*this.service.list()
    .pipe(
      //melhor que o catch fique no último operador do pipe
      catchError(error => empty())
    )
    .subscribe(
      dados => {
        console.log(dados);
      },
      error => console.error(error),
      () => console.log('Observable Completo"')
    );*/
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente mais tarde.');
    /*
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente mais tarde.';
    */
  }

  onEdit(id: number){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(curso: Curso){
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
  }

  //deleção física
  onConfirmDelete(){
    this.service.delete(this.cursoSelecionado.id)
    .subscribe(
      success => {this.onRefresh(), this.alertService.showAlertSuccess('Curso removido com sucesso!');},
      error => this.alertService.showAlertDanger('Curso não foi removido.'),
      () => console.log('Requisição completa."')
    );
    this.deleteModalRef.hide();
  }
  onDeclineDelete(){
    this.deleteModalRef.hide();
  }
}
