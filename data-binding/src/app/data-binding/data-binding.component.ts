import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
  //styles:[
  //  `.highlight{
  //    background-color: rgb(250, 210, 31);
  //    font-weight: bold;
  //  }
  //  `
  //]
})
export class DataBindingComponent implements OnInit {

  url: string = 'urlLuana';
  cursoAngular: boolean = true;
  urlImagem: string = 'http://placekitten.com/250/50';
  valorAtual: string = '';
  valorSalvo: string = '';
  isMouseOver: boolean = false;
  nome: string ='inicial';
  pessoa: any = {
    nome: 'lua',
    idade: 21
  }
  nomeDoCurso: string = 'Angular';
  valorInicial: number = 10;

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  botaoClicado(){
    alert('Clicado!');
  }

  onKeyUp(event: KeyboardEvent){
    //console.log((<HTMLInputElement>event.target).value);
    this.valorAtual = (<HTMLInputElement>event.target).value;
  }

  salvarValor(valor:string){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(event: any){
    alert(event.novoValor);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
