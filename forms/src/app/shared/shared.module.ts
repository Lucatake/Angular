import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErrorComponent } from './campo-control-error/campo-control-error.component';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaCepService } from './services/consulta-cep.service';
import { ErrorMessageComponent } from './error-message/error-message.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErrorComponent,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FormDebugComponent,
    CampoControlErrorComponent,
    ErrorMessageComponent,
  ],
  providers: [
    DropdownService,
    ConsultaCepService
  ]
})
export class SharedModule { }
