import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(private element:ElementRef) {
    //console.log(this.element);
   }

   @Input('appResaltado') nuevoColor!: string;

   @HostListener('mouseenter')
   colorEntra(){
     this.element.nativeElement.style.backgroundColor = this.nuevoColor;
    }
    @HostListener('mouseleave')
    colorSale(){
      this.element.nativeElement.style.backgroundColor = null;
     }
 
  

}
