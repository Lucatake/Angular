import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidation } from '../services/form-validation';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input()
  control: FormControl = new FormControl;
  @Input() label: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage() {

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
          return FormValidation.getErrorMessage(this.label, propertyName, this.control.errors[propertyName]);
        }
    }
    return false;
  }

}
