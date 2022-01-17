import { Injectable } from '@angular/core';

@Injectable({//injeção de dependencia
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  getCursos(){
    return ['teste 1', 'teste 2'];
  }

}
