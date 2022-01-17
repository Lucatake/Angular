import { NgModule } from '@angular/core'; //importa o decorator
import { BrowserModule } from '@angular/platform-browser'; //prepara a aplicação para rodar em um browser
import { FormsModule } from '@angular/forms'; //modulo de formulário
import { HttpClientModule } from '@angular/common/http'; //antes HttpModule - contem objto http p/ requisições AJAX
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MeuPrimeiro } from './meu-primeiro/meu-primeiro.component';
import { MeuSegundoComponent } from './meu-segundo/meu-segundo.component';
import { CursosModule } from './cursos/cursos.module';

@NgModule({ //Decorar a classe, o que ela representa? No caso, um módulo
  declarations: [ //Componentes, diretivas e pipes
    AppComponent,
    MeuPrimeiro,
    MeuSegundoComponent
  ],
  imports: [ //Outros módulos
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CursosModule
  ],
  providers: [],//serviços disponíveis p/ todos componentes
  bootstrap: [AppComponent]//só na raiz, qual componente deve ser instanciado ao executar a aplicação (container)
})
export class AppModule { } //declaração da classe
