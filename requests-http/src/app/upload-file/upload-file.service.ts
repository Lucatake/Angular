import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpClient
  ) { }

  upload(files: Set<File>, url: string){

    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    //criação de request manual
    /*const request = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });
    return this.http.request(request);*/

    return this.http.post(url, formData);
  }
}