import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder,
  FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { min } from 'rxjs/operators';
import { Placa } from '../placa';

@Component({
  selector: 'app-plaques-new',
  templateUrl: './plaques-new.component.html',

})
export class PlaquesNewComponent implements OnInit {

  formPlaca: FormGroup;

  constructor(private formBuilder:FormBuilder) {
  }

  crearFormulario(){
    this.formPlaca = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(5)]],
      client: ['', Validators.required],
      power: [0, this.minPowerValidator(100)],
      production: this.formBuilder.array([this.getProductionControl()])
    },{validators: this.maxPowerValidator});
  }

  getProductionControl(): FormControl{
    const control = this.formBuilder.control(0);
    control.setValidators(Validators.min(100));
    return control;
  }

  get productionArray(): FormArray {
    return <FormArray>this.formPlaca.get('production');
  }

  addProduction(){
    (<FormArray>this.formPlaca.get('production'))
        .push(this.getProductionControl());
                }

 delProduction(i:number){
   (<FormArray>this.formPlaca.get('production')).removeAt(i);
  }

  get idValid(){
    const control = this.formPlaca.get('id');
    if(!control.touched){ return null;}
    else {
      return control.valid
    }
  }

  get clientValid(){
    return this.formPlaca.get('client');
  }
  get powerValid(){
    return this.formPlaca.get('power');
  }

  ngOnInit(): void {
  this.crearFormulario();
  }

  minPowerValidator(minInputPower: number): ValidatorFn {
    return (c: FormArray): { [key: string]: any } | null => {
      if (c.value) {
       if(c.value < minInputPower){ return {minPowerValidator: true}}
       else return null;
      }
        return null;
      };
   }

   maxPowerValidator: ValidatorFn =
    (c: AbstractControl): ValidationErrors | null => {
      if (c.value) {
        const power = c.get('power').value
        const productions = (<FormArray>c.get('production')).controls
        for(let p of productions){
          if(p.value > power) {
            console.log('maxPower', p.value);

            return {maxPowerValidator: true};
          }
        }
        return null;
      };
   }

}
