import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appMinPrice]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinPriceDirective,
     multi: true}]
})
export class MinPriceDirective implements Validator {
  @Input('appMinPrice') minPrice;

  constructor() { }

  validate( c: AbstractControl): { [key: string]: any}{
    console.log(c.value, this.minPrice);
    if(this.minPrice && c.value) { // si rebem algun valor
      console.log(c.value, this.minPrice);
      if(this.minPrice > c.value) {
        return { minPrice: true }  //devolvemos el error
      }
    }
    return null; // sense error
  }
}
