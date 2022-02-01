import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private modalService: AlertModalService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  hasError(campo: string) {
    return this.form.get(campo)?.errors;
  }
  hasErrors(campo: string, error: string) {
    return (
      this.form.get(campo)?.errors && this.form.get(campo)?.hasError(error)
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.cursosService.create(this.form.value).subscribe(
        (success) => {
          this.modalService.showAlertSuccess('Curso criado com sucesso!'),
            this.location.back();
        },
        (error) => this.modalService.showAlertDanger('Erro ao criar curso!'),
        () => this.modalService.showAlertInfo('Requisição completa.')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
