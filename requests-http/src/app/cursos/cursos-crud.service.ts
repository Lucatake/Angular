import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud-service';
import { Curso } from './cursos';

@Injectable({
  providedIn: 'root'
})
//Para passar um tipo para a classe genérica
//export class CursosCrudService extends CrudService<Curso>{
export class CursosCrudService extends CrudService{

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
