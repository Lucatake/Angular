import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    //criar form com FormBuilder
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit() {

    //criar form com FormControl
    /*this.form = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      endereco: new FormGroup({
        cep: new FormControl(null),
      })
    });*/

    //criar form com FormBuilder
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      //[Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      email: [null, [Validators.required, Validators.email]],
      //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
  }

  onSubmit(){
    //simulação de post
    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
    .pipe(res => res)
    .subscribe((dados: any) => {
      console.log(`sucesso!: ${dados}`);
      this.resetForm();
    }),
    //nao resetar o form após submit caso erro
    (error: any) => alert('erro!');
  }

  resetForm(){
    this.form.reset();
  }


}
