import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(private element:ElementRef) {
    //console.log(this.element);
   }

   @Input('appResaltado') nuevoColor!: string;
   @Input() displayElements: any[] = []

   @HostListener('mouseenter')
   colorEntra(){
     //console.log(this.displayElements);

     this.element.nativeElement.style.backgroundColor = this.nuevoColor;
     this.element.nativeElement.style.boxShadow = '10px 10px 8px #888888';
     this.element.nativeElement.querySelector('img').style.transitionDuration = '2s';
     this.element.nativeElement.querySelector('img').style.transform ='scale(1.1) rotate(20deg)';
     //this.element.nativeElement.querySelector('.planet-temperature').style.display = '';
     this.displayElements.map(e => e.style.display = '' )

    }
    @HostListener('mouseleave')
    colorSale(){
      this.element.nativeElement.style.backgroundColor = null;
      this.element.nativeElement.style.boxShadow = null;
      this.element.nativeElement.querySelector('img').style.transform ='scale(1)';
      this.displayElements.map(e => e.style.display = 'none' )

     // this.element.nativeElement.querySelector('.planet-temperature').style.display = 'none';
     }




}
