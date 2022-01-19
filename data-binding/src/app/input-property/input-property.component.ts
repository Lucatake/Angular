import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-property',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css']
  //inputs: ['nomeDoCurso:nome' ou 'nomeDoCurso']
})
export class InputPropertyComponent implements OnInit {

  @Input() nomeDoCurso: string = ''; //decorador, define como propriedade para o seletor
  //@Input('nomeDoCurso')... para definir outro nome para a variável

  constructor() { }

  ngOnInit(): void {
  }

}
