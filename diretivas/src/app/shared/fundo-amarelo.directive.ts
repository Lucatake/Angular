import { Directive, ElementRef, Renderer2 } from '@angular/core';
//diretiva de propriedade
@Directive({
  selector: '[appFundoAmarelo]'
  //selector: 'p[appFundoAmarelo]' ou selector: 'button[appFundoAmarelo]' --> 'nomeTag[appFundoAmarelo]'
  //faria com que fosse aplicado somente aquele tipo de elemento/componente
})
export class FundoAmareloDirective {

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
    ) { //injeção de dependência
    //console.log(this._elementRef);

    //pede-se para evitar utilizar diretamente o ElementRef, pois acessa diretamente a tag p -> gera ataques de XXS
    //this._elementRef.nativeElement.style.backgroundColor = 'yellow';

    //boas práticas é utilizar o renderer
    this._renderer.setStyle(this._elementRef.nativeElement, 'background-color',  'rgb(248, 227, 109)');
  }

}
