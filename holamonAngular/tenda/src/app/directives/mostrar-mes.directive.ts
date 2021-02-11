import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';
import * as EventEmitter from 'events';

@Directive({
  selector: '[appMostrarMes]'
})
export class MostrarMesDirective {

  constructor(private e: ElementRef, private r: Renderer2) { }

  @Input('appMostrarMes') elementMostrar!: any[];

@HostListener('mouseenter')
@HostListener('mouseleave')
 entrarMouse(){
   for( let e of this.elementMostrar){
     console.log(e.style.display);
     if(e.style.display == '') this.r.setStyle(e,'display','none');
     else  this.r.setStyle(e,'display','');
   }
 }
 /*@HostListener('mouseleave')
 saleMouse(){
  for( let e of this.elementMostrar){
    this.r.setStyle(e,'display','none');
    }
 }*/


}
