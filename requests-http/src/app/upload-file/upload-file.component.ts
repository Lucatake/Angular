import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  progress: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any){
    const selectedFiles = <FileList>event.srcElement.files;
    console.log(selectedFiles);

    const fileNames = [];
    for(let i = 0; i<selectedFiles.length;i++){
      fileNames.push(selectedFiles[i].name);
    }
    document.getElementById('customFileLabel')!.innerHTML = fileNames.join(', ');
  }

}
