import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { CidadeBr } from '../models/cidades-br';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  getEstadosBR(){
    //console.log(this.http.get('assets/dados/estados.json'));
    return this.http.get<EstadoBr[]>('assets/dados/estados.json');
  }

  getCidadesBR(id: number){
    return this.http.get<CidadeBr[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: CidadeBr[]) => cidades.filter(c => c.estado == id))
    );
  }

  getCargos(){
    return [
      {nome: 'dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'dev', nivel: 'Senior', desc: 'Dev Sr'}
    ];
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'c', desc: 'C'}
    ];
  }

  getNews(){
    return [
      {nome: 's', desc: 'Sim'},
      {nome: 'n', desc: 'Não'}
    ];
  }
}
