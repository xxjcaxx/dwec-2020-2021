import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { IPlanet } from '../planet/i-planet';

@Directive({
  selector: '[appForDelay]'
})
export class ForDelayDirective {

  planets: IPlanet[] = [];
  delay = 1000;

  @Input() 
  set appForDelay(n : number){
    this.delay = n;
  }
  @Input() 
  set appForDelayTemps(n : number){
    this.delay = n;
  }


  @Input()
  set appForDelayDe(p: IPlanet[]){
    this.planets = p;
    this.viewContainer.clear();
    let i=0;
    this.planets.forEach(
      p => {
      setTimeout(()=>{
          this.viewContainer.createEmbeddedView(
            this.templateRef,{ $implicit: p})
      },this.delay*i);
      i++;
    }
     
    );
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

}
