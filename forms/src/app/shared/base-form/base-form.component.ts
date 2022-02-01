import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<br>'
})
export abstract class BaseFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit(): void;

  onSubmit(){
    if(this.form.valid){
      this.submit();
    } else {
      this.verificaValidacoes(this.form);
    }
  }

  verificaValidacoes(formGroup: FormGroup | FormArray){
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      control?.markAsDirty();
      control?.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray){
        this.verificaValidacoes(control);
      }
    });
  }

  resetForm(){
    this.form.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.form.get(campo)?.valid
    && (this.form.get(campo)?.touched || this.form.get(campo)?.dirty);
  }

  verificaRequired(campo: string){
    return this.form.get(campo)?.hasError('required')
    && (this.form.get(campo)?.touched || this.form.get(campo)?.dirty);
  }

  validaEmail(){
    let campoEmail = this.form.get('email');
        if(campoEmail?.errors){
      return campoEmail?.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    };
  }

  getCampo(campo: string){
    return this.form.get(campo);
  }

}
