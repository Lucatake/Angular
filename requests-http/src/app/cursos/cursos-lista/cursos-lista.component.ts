import { catchError, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { empty, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[] = [];
  cursos$: Observable<Curso[]> = new Observable;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService
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
        this.error$.next(true);
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

}
