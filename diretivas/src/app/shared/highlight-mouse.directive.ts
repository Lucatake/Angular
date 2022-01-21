import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';
//diretiva de propriedade
@Directive({
  selector: '[appHighlightMouse]'
})
export class HighlightMouseDirective {
  //HostListener - escuta eventos no hospedeiro da diretiva
  //HostBinding - faz o binding de um atributo/classe para uma variável

  //gera muito similares - repetitivo
  @HostListener('mouseenter') onMouseOver(){
    /*this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'rgb(0, 138, 251)');
    this._renderer.setStyle(this._elementRef.nativeElement, 'color', 'white');*/
    this.backColor = 'rgb(0, 138, 251)';
    this.color = 'white';
  };
  @HostListener('mouseleave') onMouseLeave(){
    /*this._renderer.setStyle(this._elementRef.nativeElement, 'background-color', 'white');
    this._renderer.setStyle(this._elementRef.nativeElement, 'color', 'black');*/
    this.backColor = 'white';
    this.color = 'black';
  };

  @HostBinding('style.backgroundColor') backColor: string = '';
  //@HostBinding('style.color') color: string = '';
  //usando metodos getters e setters -> para manupulação extra
  private color: string = '';
  @HostBinding('style.color') get setColor(){
    //+ codigo extra
    return this.color;
  };

  constructor(
    //private _elementRef: ElementRef,
    //private _renderer: Renderer2
    ) {

    }

}
