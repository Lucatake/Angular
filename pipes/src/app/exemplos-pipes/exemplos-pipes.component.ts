import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit, OnDestroy {

  livro: any= {
    titulo: 'Titulo Livro Testes com Pipes',
    rating: 4.5559,
    numeroPaginas: 298,
    preco: 39.90,
    dataLancamento: new Date(2018, 8, 15),
    url: 'link'
  };

  livros: string[] = ['Java', 'Angular', 'Python'];
  filtro: string ='';

  addLivro(valor: string){
    this.livros.push(valor);
  }

  obterLivros(){
    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }

    return this.livros.filter((v) => {
      if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0){
        return true;
      }
      return false;
    });
  }

  //simulando casos de busca de valores no servidor, o que pode demorar
  //com promise - promessa
  valorAsync = new Promise((resolve, reject) => {
    //valor é atribuido apenas após 2 segundos
    setTimeout(() => resolve('Valor Assíncrono'), 2000);
  });

  //com observables - programação reativa
  //antes - valorAsync2 = Observable.interval(2000).map((valor: string) => 'Valor Assíncrono 2');
  novoObservable(): Observable<string> {
    return new Observable<string>(observador => {
      setTimeout(() => {
        observador.next("Valor Assíncrono 2");
      }, 2000);
    });
  }
  valorAsync2: string[] = [];
  inscricaoObservable: Subscription = new Subscription;

  constructor() { }

  ngOnInit() {
    const observable = this.novoObservable();

    this.inscricaoObservable = observable.subscribe(
      valor => {
        this.valorAsync2.push(valor);
      },
      erro => {
        this.valorAsync2.push(erro);
      },
      () => {
        this.valorAsync2.push("O observable foi encerrado!");
      });
  }
  ngOnDestroy() {
    if (this.inscricaoObservable)
      this.inscricaoObservable.unsubscribe();
  }

}
