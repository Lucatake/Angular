import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AlunosService } from '../alunos/alunos.service';

@Injectable({providedIn: 'root'})
export class AlunosGuard implements CanActivateChild{
  constructor(
    private alunosService: AlunosService,
    private route: ActivatedRoute
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean> | boolean {
    //exemplo que barra a edição do usuário
    if(state.url.includes('edit') && (!state.url.includes('1'))){
      alert('Usuário sem acesso');
      return false;
    }
    return true;
  }
}
