import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor( private el:ElementRef) {

  }

  @Input('appResaltado') nuevoColor:string;

  @HostListener('mouseenter')
  entrarMouse(){
    console.log(this.nuevoColor);

    this.el.nativeElement.style.backgroundColor = this.nuevoColor;
  }
  @HostListener('mouseleave')
  saleMouse(){
    this.el.nativeElement.style.backgroundColor = null;
  }

}
