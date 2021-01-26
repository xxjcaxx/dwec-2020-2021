import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Pipe, PipeTransform } from '@angular/core';
import { IPlanet } from '../i-planet';

@Pipe({
  name: 'filterPlanet'
})
export class FilterPlanetPipe implements PipeTransform {

  transform(planetes: IPlanet[], criteri: string): IPlanet[] {

    const c = criteri ? criteri.toLocaleLowerCase() : null;
    return c 
    ? planetes.filter( p => p.name.toLocaleLowerCase().includes(c))
    : planetes;
  }

}
