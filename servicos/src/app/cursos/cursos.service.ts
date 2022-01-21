import { Injectable, EventEmitter } from "@angular/core";

import { LogService } from "../shared/log.service";

//criando manualmente
@Injectable()
export class CursosService {

  emitirCursoCriado = new EventEmitter<string>();
  //para emitir para instância diferente do serviço
  //não precisa da instância para acessá-lo, será compartilhada
  static criouCurso = new EventEmitter<string>();

  private cursos: string[] = ['Angular', 'Java'];

  //injetando um serviço
  constructor(private logService: LogService) {

  }

  getCursos() {
    //utilizando serviço injetado
    this.logService.consoleLog('Obtendo lista de cursos.');
    return this.cursos;
  }

  addCurso(curso: string) {
    //utilizando serviço injetado
    this.logService.consoleLog(`Criando novo curso: ${curso}.`);
    this.cursos.push(curso);
    //emitir eventos/curso
    this.emitirCursoCriado.emit(curso);
    //para emitir para instância diferente do serviço
    CursosService.criouCurso.emit(curso);
  }
}
