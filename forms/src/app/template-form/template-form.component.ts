import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null
  };

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    };
  }

  consultarCEP(cep: any){
    cep = cep.value.replace(/\D/g, '');
    console.log(cep);

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .pipe(map((dados: any) => dados))
        .subscribe((dados: any) => console.log(dados));
      }

    }
  }
}
