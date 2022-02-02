import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../shared/rxjs-operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  progress: number = 0;
  sub: Subscription = new Subscription();
  files: Set<File> = new Set();

  constructor(private service: UploadFileService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }

  onChange(event: any) {
    const selectedFiles = <FileList>event.srcElement.files;
    console.log(selectedFiles);

    const fileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel')!.innerHTML =
      fileNames.join(', ');
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.sub = this.service
        .upload(this.files, '/api/upload')
        //.upload(this.files, 'http://localhost:8000/upload')

        //com o operador rxjs
        /*.pipe(
          uploadProgress((progress) => (this.progress = progress)),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluido'))*/
        .subscribe ((event: HttpEvent<Object>) => {
        //criando operadores rxjs para essas verificações
        if (event.type === HttpEventType.Response) {
            console.log('Concluído');
          } else if (
            event.type === HttpEventType.UploadProgress &&
            event.total
          ) {
            const percent = Math.round((event.loaded * 100) / event.total);
            console.log('Progresso');
            this.progress = percent;
          }
        });
    }
  }

  onDownloadExcel() {

    /* ->> colocado no handle file

    this.service.download(environment.BASE_URL + '/downloadExcel')
    .subscribe((res: any) => {
      const file = new Blob([res], {
        type: res.type
      })
    });

    // IE - explorer
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    //"gambiarra" cria um link invisivel
    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    link.download = 'report.xlsx';

    //no firefox mais novo não funciona
    link.click();
    window.URL.revokeObjectURL(blob);
    link.remove;

    //firefox
    link.dispatchEvent(new MouseEvent('click',{
      bubbles: true,
      cancelable: true,
      view: window
    }));
    setTimeout(()=> {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
    */

    this.service.download(environment.BASE_URL + '/downloadExcel')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'report.xlsx');
    });
  }

  onDownloadPDF() {
    this.service.download(environment.BASE_URL + '/downloadPDF')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'report.pdf');
    });
  }


}
