import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private service: CursosService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Curso | Observable<Curso> | Promise<Curso> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({
      id: 0,
      nome: ''
    });
  }
}
