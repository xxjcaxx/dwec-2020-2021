import { Pipe, PipeTransform } from '@angular/core';
import { Placa } from './placa';

@Pipe({
  name: 'filterPlaques'
})
export class FilterPlaquesPipe implements PipeTransform {

  transform(plaques: Placa[], criteri: string): Placa[] {
    criteri = criteri ? criteri.toLocaleLowerCase() : null;
    plaques = criteri ? plaques.filter(p => p.client.toLocaleLowerCase().includes(criteri)): plaques;
    return plaques;

  }

}
