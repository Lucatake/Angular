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

  consultarCEP(cep: any, forms: any){
    cep = cep.value.replace(/\D/g, '');
    console.log(cep);

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      //caso os campos estivessem abertos para edição
      //resetaria eles antes da pesquisa e da população
      this.resetaDadosForm(forms);

      if(validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        //.pipe(map((dados: any) => dados)) não é mais necessário -> já traz no formato json
        .subscribe((dados: any) => this.populaDadosForm(dados, forms));
      }
    }
  }

  populaDadosForm(dados: any, forms: any){

    //set value reseta as outras infos se nao repassar as infos antigas
    //necessario repetir as infos já preenchidas
    /*forms.setValue(
      {
        nome: forms.form.value.nome,
        email: forms.form.value.email,
        endereco: {
          cep: dados.cep,
          numero: dados.complemento,
          complemento: forms.form.value.endereco.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      }
    );*/
    //patch value do form permite alteração de apenas os campos necessarios do form
      forms.form.patchValue({
        endereco: {
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });
  }

  resetaDadosForm(forms: any){
    forms.form.patchValue({
      endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}
