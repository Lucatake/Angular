import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TrackByFunction } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EstadoBr } from '../shared/models/estado-br';
import { DropdownService } from '../shared/services/dropdown.service';
import { __values } from 'tslib';
import { FormValidation } from '../shared/services/form-validation';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  estados: EstadoBr[] = [];
  //pipe async
  //estados: Observable<EstadoBr[]> = new Observable();
  tech: any[] = [];
  cargos: any[] = [];
  newsop: any[] = [];
  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    //criar form com FormBuilder
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService
    ) { }

  ngOnInit() {

    //melhor fazer a chamada async
    this.dropDownService.getEstadosBR()
    .subscribe((dados: any) => this.estados = dados);
    //this.estados = this.dropDownService.getEstadosBR();
    //pipe async faz automaticamente o subscrite e unsubscribe
    this.tech = this.dropDownService.getTecnologias();
    this.cargos = this.dropDownService.getCargos();
    this.newsop = this.dropDownService.getNews();


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
      }),
      cargo: [null],
      tecnologia: [null],
      news: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFrameworks()
    });
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidation.requiredMinCheckbox(1));
    /*return[
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]*/
  }
  getControls() {
    return (this.form.get('frameworks') as FormArray)?.controls;
  }

  onSubmit(){
    let valueSubmit = Object.assign({}, this.form.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v: any, i: any) => v ? this.frameworks[i] : null)
      .filter((v: any) => v != null)
    });

    if(this.form.valid){
      //simulação de post
      this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .pipe(res => res)
      .subscribe((dados: any) => {
        console.log(`sucesso!: ${dados}`);
        this.resetForm();
      }),
      //nao resetar o form após submit caso erro
      (error: any) => alert('erro!');
    } else {
      //funciona apenas para campos controle em primeira instância
      /*Object.keys(this.form.controls).forEach(campo => {
        const control = this.form.get(campo);
        control?.markAsDirty();
      });*/
      this.verificaValidacoes(this.form);
    }
  }

  verificaValidacoes(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      control?.markAsDirty();
      //para verificar recursivamente os outros grupos e campos controles
      if (control instanceof FormGroup){
        this.verificaValidacoes(control);
      }
    });
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
    //valido, tocado ou modificado
    return !this.form.get(campo)?.valid && (this.form.get(campo)?.touched || this.form.get(campo)?.dirty);
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

  setarCargo(){
    const cargo = {nome: 'dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.form.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologia(){
    this.form.get('tecnologia')?.setValue(['c', 'java']);
  }
}
