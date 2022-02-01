import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[] = [];
  cursos$: Observable<Curso[]> = new Observable;

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

    //pipe async - inscrição automatica
    this.cursos$ = this.service.list();

  }

}
