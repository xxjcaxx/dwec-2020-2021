import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(private element:ElementRef,
    private r: Renderer2
    ) {
    //console.log(this.element);
   }

   @Input('appResaltado') nuevoColor!: string;
   @Input() displayElements: any[] = []

   @HostListener('mouseenter')
   colorEntra(){
     this.r.setStyle(this.element.nativeElement,'background-color',this.nuevoColor);
     this.r.setStyle(this.element.nativeElement,'box-shadow','10px 10px 8px #888888');
     this.r.setStyle(this.element.nativeElement.querySelector('img'),'transform','scale(1.1) rotate(20deg)');
     this.r.setStyle(this.element.nativeElement.querySelector('img'),'transition-duration','2s');
     this.element.nativeElement.querySelector('img').style.transitionDuration = '2s';
     this.displayElements.map(e => e.style.display = '' )
    }
    @HostListener('mouseleave')
    colorSale(){
      /* És millor en renderer2, 
      deixe este codi per tindre un exemple de cada */
      this.element.nativeElement.style.backgroundColor = null;
      this.element.nativeElement.style.boxShadow = null;
      this.element.nativeElement.querySelector('img').style.transform ='scale(1)';
      this.displayElements.map(e => e.style.display = 'none' )

     // this.element.nativeElement.querySelector('.planet-temperature').style.display = 'none';
     }




}
