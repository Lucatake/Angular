import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent implements OnInit {

  nome: string ='inicial';
  pessoa: any = {
    nome: 'lua',
    idade: 21
  }

  constructor() { }

  ngOnInit(): void {
  }

}
