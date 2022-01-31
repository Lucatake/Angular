import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class FormValidation{

  static requiredMinCheckbox(min:number = 1){
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      //programação estruturada
      /*const values = formArray.controls;
      let totalChecked = 0;
      for( let i = 0; i < values.length; i++){
        if(values[i].value){
          totalChecked++;
        }
      }*/

      //programação funcional
      if (formArray instanceof FormArray) {
        const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => (current ? total + current : total), 0);
        return totalChecked >= min ? null : { required: true };
      }
      throw new Error('formArray is not an instance of FormArray');
    };

    return validator;
  }

  static cepValidator(control: FormControl){

    const cep = control.value;
    if(cep && cep !== ''){
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : {cepInvalido : true};
    }
    return null;
  }

  static equalsTo(otherField: string){
    const validator = (formControl: AbstractControl) => {
      if (otherField == null){
        throw new Error('necessário informar o campo.');
      }
      if (!formControl.root || !(<FormGroup>formControl.root).controls){
        return null;
      }
        const field = (<FormGroup>formControl.root).get(otherField);
      if (!field){
        throw new Error('necessário informar um campo válido.');
      }
      if (field.value !== formControl.value){
        return { equalsTo: otherField };
      }
      return null;
    };
    return validator;
  }
}
