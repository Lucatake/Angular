import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  usuario: any = {
    nome: 'Luana',
    email: 'luana@gmail.com'
  };

  onSubmit(form: any){

  }

}
