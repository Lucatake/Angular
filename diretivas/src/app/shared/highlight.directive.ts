import { Directive, HostListener, HostBinding, Input } from '@angular/core';
//diretiva de propriedade
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseOver(){
    this.backColor = this.highlightBackColor;
    this.color = this.highlightColor;
  };

  @HostListener('mouseleave') onMouseLeave(){
    this.backColor = this.defaultBackColor;
    this.color = this.defaultColor;
  };

  @HostBinding('style.backgroundColor') backColor: string = '';
  @HostBinding('style.color') color: string = '';

  @Input() defaultBackColor: string = '';
  @Input() defaultColor: string = '';
  @Input() highlightColor: string = 'white';
  //@Input() highlightBackColor: string = 'red';
  @Input('appHighlight') highlightBackColor: string = '';

  ngOnInit(){
    this.backColor = this.defaultBackColor;
    this.color = this.defaultColor;
  }

  constructor() { }

}
