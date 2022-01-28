import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  getEstadosBR(){
    console.log(this.http.get('assets/dados/estados.json'));
    return this.http.get('assets/dados/estados.json');
  }
}
