import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from './cursos';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API).pipe(delay(200));
  }

  create(curso: string) {
    return this.http.post(this.API, curso).pipe(take(1));
  }
}
