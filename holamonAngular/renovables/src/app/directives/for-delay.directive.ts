import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appForDelay]'
})
export class ForDelayDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {

   }

   items: Array<number> = [];
   delay = 0;
   // items: number[] = []

   @Input() set appForDelay(t: number){
      this.delay = t;
   }

   @Input()
   set appForDelayOf(array: number[]){
     this.items = array;

   }

   ngOnInit(): void {
    let i = 0;
    this.items.forEach(n => {
      setTimeout(()=>{
       this.viewContainer.createEmbeddedView(this.templateRef, {$implicit: n})
      },this.delay*i);
      i +=1;
    });

   }

}
