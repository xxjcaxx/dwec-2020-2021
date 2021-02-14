import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appMinPower]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinPowerDirective,
    multi: true}]
})
export class MinPowerDirective implements Validator {

  @Input('appMinPower') minPower;

  constructor() { }

  validate( c: AbstractControl): {[key:string]: any} | null
  {
    if(this.minPower && c.value){

      if (parseInt(this.minPower) > parseInt(c.value)){
        console.log(this.minPower, c.value);

        return {minPower: true}
      }
    }
    return null;
  }

}
