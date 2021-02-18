import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';
import * as EventEmitter from 'events';

@Directive({
  selector: '[appMostrarMes]'
})
export class MostrarMesDirective {

  constructor(private e: ElementRef, private r: Renderer2) { }

  @Input() elementMostrar!: any;

@HostListener('mouseenter')
 entrarMouse(){
   //let p = this.e.nativeElement.querySelector('.ocultar');
   this.r.setStyle(this.elementMostrar,'display','');
  // this.e.nativeElement.querySelector('.ocultar').style.display = '';
 }
 @HostListener('mouseleave')
 saleMouse(){
  this.r.setStyle(this.elementMostrar,'display','none');
 }


}
