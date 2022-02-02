import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

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
        .subscribe((event: HttpEvent<Object>) => {
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
}
