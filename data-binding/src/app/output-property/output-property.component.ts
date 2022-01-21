import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

//import * as internal from 'stream';

@Component({
  selector: 'app-output-property',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css']
  //outputs: ['mudouValor']
})
export class OutputPropertyComponent implements OnInit {

  //componente pai passe infos para o componente filho
  @Input() valor: number = 0;
  //componente filho passe infos/eventos para o componente pai
  @Output() mudouValor = new EventEmitter(); //broadcast de eventos

  @ViewChild('campoInput')campoValorInput!: ElementRef; //acesso ao DOM e template

  incrementa(){
    this.campoValorInput.nativeElement.value++;
    this.mudouValor.emit({novoValor: this.campoValorInput.nativeElement.value});
    //this.valor++;
    //this.mudouValor.emit({novoValor: this.valor});
  }

  decrementa(){
    this.campoValorInput.nativeElement.value--;
    this.mudouValor.emit({novoValor: this.campoValorInput.nativeElement.value});
    //this.valor--;
    //this.mudouValor.emit({novoValor: this.valor});
  }

  constructor() { }

  ngOnInit(): void {
  }

}
