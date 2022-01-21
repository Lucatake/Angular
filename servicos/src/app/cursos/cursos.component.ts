import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];
  //cursosService: CursosService;


  constructor(private cursosService: CursosService) { //_cursosService: CursosService c/ variável privada
    //não é interessante fazer a instância manualmente, melhor com DI (dependency injection)
    //this.cursosService = new CursosService();
    //com  DI
    //this.cursosService = _cursosService;
  }

  ngOnInit(){
    this.cursos = this.cursosService.getCursos();

    //inscrição para ouvir o evento
    //this.cursosService.emitirCursoCriado.subscribe(

    CursosService.criouCurso.subscribe(
      //arrow function
      curso => this.cursos.push(curso)
      //function(curso){ }
    );
  }

}
