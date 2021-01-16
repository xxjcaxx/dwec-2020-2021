import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform { //al implementar PipeTransform cal fer la funció Transform

  transform(products: Product[], filterBy: string): Product[] { // el primer argument és el que cal filtrar i després una llista d'arguments
  // en aquest cas sols és un, el criteri de búsqueda
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null; // passem el filtre a minúscules o a null si no està
    return filter ?  // Si no és null filtra
    products.filter(p => p.name.toLocaleLowerCase().includes(filter))
    : products; // si és null trau l'array sense filtre
  }

}
