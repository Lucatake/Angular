import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit{

  nomePortal: string;
  cursos: string[] = ['Template', 'Template2']; 
  cursos2:  string[];
  
  //injeção por um construtor
  constructor(private cursosService: CursosService){
    this.nomePortal = 'LuanaTest';

    //var servico = new CursosService(); //instanciar, =! de injeção de dependência
    this.cursos2 = this.cursosService.getCursos();
  }

  ngOnInit(): void {
      
  }
}
