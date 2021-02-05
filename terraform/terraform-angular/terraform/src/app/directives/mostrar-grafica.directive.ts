import { ComponentFactoryResolver, Directive, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { GraphsComponent } from '../components/graphs/graphs.component';
import { GData } from '../interfaces/g-data';

@Directive({
  selector: '[appMostrarGrafica]'
})
export class MostrarGraficaDirective {

  graphData: GData[] = [];
  graphRef: any;

  @Input() set appMostrarGrafica(graphData: GData[]){
    this.graphData = graphData;
    //console.log('input directiva');
    if (this.graphRef) this.graphRef.instance.graphData = this.graphData;
  }

   constructor(
    private templateRef: TemplateRef<any>, // La plantilla del div on anirà la gràfica
    private viewContainer: ViewContainerRef, // El div pare
    private renderer: Renderer2, // utilitat per manipular el DOM
    private componentFR: ComponentFactoryResolver, // per trobar altres components
  ) { }

   ngOnInit(): void {
     //console.log('oninit directiva');

    const viewRef = this.viewContainer.createEmbeddedView(this.templateRef); // creem la plantilla (sempre es fa)
    const primerNode = viewRef.rootNodes[0]; // necessitem accedir al node del DOM creat
    const graphComponent = this.componentFR.resolveComponentFactory(GraphsComponent);

    this.graphRef = this.viewContainer.createComponent(graphComponent);
    this.graphRef.instance.graphData = this.graphData;
    this.renderer.appendChild(primerNode,this.graphRef.location.nativeElement);
    //console.log(this.graphData);
   }
// https://stackoverflow.com/questions/58826887/using-dynamic-component-within-angular-structural-directive-produces-extra-html
}
