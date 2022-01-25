import { EventEmitter, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>(false);

  constructor(
    private router: Router
  ) { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome == 'usuario@email.com' &&
      usuario.senha == '123456'){
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        this.router.navigate(['/']);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
  }

  usuarioAuth(){
    return this.usuarioAutenticado;
  }
}
