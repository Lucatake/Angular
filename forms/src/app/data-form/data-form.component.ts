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

  consultarCEP(){
    let cep = this.form.get('endereco.cep')?.value;
    cep = cep?.replace(/\D/g, '');

    if (cep != "" && cep != null) {
      var validacep = /^[0-9]{8}$/;

      this.resetaDadosForm();

      if(validacep.test(cep)) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        .subscribe((dados: any) => {
          this.populaDadosForm(dados)
        });
      }
    }
  }

  resetaDadosForm(){
    this.form.patchValue({
      endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  populaDadosForm(dados: any){
      this.form.patchValue({
        endereco: {
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });

      //settar campo isolado com setValue()
      //this.form.get('nome')?.setValue('Luana');
  }

  verificaValidTouched(campo: string) {
    //this.form.controls[campo];  this.form.get(campo);
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched;
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    };
  }

  //formato do email - caso não válido
  validaEmail(){
    let campoEmail = this.form.get('email');
        if(campoEmail?.errors){
      return campoEmail?.errors['email'] && campoEmail.touched;
    }
  }
}
