import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

//import { AlunoFormComponent } from '../alunos/aluno-form/aluno-form.component';
import { IFormDeactivate } from './iform-deactivate';

@Injectable({providedIn: 'root'})
export class AlunosDeactivateGuard implements CanDeactivate<IFormDeactivate> {
  canDeactivate(
    component: IFormDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    //return component.podeMudarRota? component.podeMudarRota() : true;
    return component.podeDesativar? component.podeDesativar() : true;
  }
}
