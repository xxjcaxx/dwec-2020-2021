import { ComponentFactoryResolver, Directive, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { GraphsComponent } from '../components/graphs/graphs.component';
import { GData } from '../interfaces/g-data';

@Directive({
  selector: '[appMostrarGrafica]'
})
export class MostrarGraficaDirective {

  graphData: GData[] = [];

  @Input() set appMostrarGrafica(graphData: GData[]){
    this.graphData = graphData;
   
    
  }

   constructor(
    private templateRef: TemplateRef<any>, // La plantilla del div on anirà la gràfica
    private viewContainer: ViewContainerRef, // El div pare
    private renderer: Renderer2, // utilitat per manipular el DOM
    private componentFR: ComponentFactoryResolver, // per trobar altres components
  ) { }

   ngOnInit(): void {
    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef); // creem la plantilla (sempre es fa)
    const primerNode = viewRef.rootNodes[0]; // necessitem accedir al node del DOM creat
    const graphComponent = this.componentFR.resolveComponentFactory(GraphsComponent);

    const graphRef = this.viewContainer.createComponent(graphComponent);
    graphRef.instance.graphData = this.graphData;
    this.renderer.appendChild(primerNode,graphRef.location.nativeElement);
    console.log(this.graphData);
   }
// https://stackoverflow.com/questions/58826887/using-dynamic-component-within-angular-structural-directive-produces-extra-html
}
