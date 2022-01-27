import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    //criar form com FormBuilder
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit() {

    //criar form com FormControl
    /*this.form = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    });*/

    //criar form com FormBuilder
    this.form = this.formBuilder.group({
      nome: [null],
      email: [null]
    });
  }

  onSubmit(){
    //simulação de post
    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
    .pipe(res => res)
    .subscribe((dados: any) => {
      console.log(`sucesso!: ${dados}`);
      this.resetForm();
    }),
    //nao resetar o form após submit caso erro
    (error: any) => alert('erro!');
  }

  resetForm(){
    this.form.reset();
  }

}
