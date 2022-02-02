import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

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
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const curso = this.route.snapshot.data['curso'];

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });

    //Para route.params o angular faz o unsubscribe
    /*this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.cursosService.loadById(id))
      )
      .subscribe((curso) => this.updateForm(curso));
    // concatMap -> ordem da requisiçao importa
    // mergeMap -> ordem nao importa
    // exhaustMap -> casos de login

    /* Para refatorar os subscribes seguidos
    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      const curso$ = this.cursosService.loadById(id);
      curso$.subscribe((curso) => {
        this.updateForm(curso);
      });
    });*/
  }

  /*updateForm(curso: any) {
    this.form.patchValue({
      nome: curso.nome,
      id: curso.id,
    });
  }*/

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

      let msgSuccess: string = 'Curso criado com sucesso!';
      let msgError: string = 'Erro ao criar curso!';
      if(this.form.value.id){
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao modificar curso!';
      }

      this.cursosService.save(this.form.value)
      .subscribe(
        (success) => {
          this.modalService.showAlertSuccess(msgSuccess),
            this.location.back();
        },
        (error) => this.modalService.showAlertDanger(msgError),
        () => console.log('Requisição completa.')
      );

      /*if(this.form.value.id){
        this.cursosService.update(this.form.value).subscribe(
          (success) => {
            this.modalService.showAlertSuccess('Curso atualizado com sucesso!'),
              this.location.back();
          },
          (error) => this.modalService.showAlertDanger('Erro ao modificar curso!'),
          () => console.log('Requisição completa.')
        );
      } else {
        this.cursosService.create(this.form.value).subscribe(
          (success) => {
            this.modalService.showAlertSuccess('Curso criado com sucesso!'),
              this.location.back();
          },
          (error) => this.modalService.showAlertDanger('Erro ao criar curso!'),
          () => this.modalService.showAlertInfo('Requisição completa.')
        );
      }*/
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
