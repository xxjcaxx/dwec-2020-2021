import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IPlanet } from '../i-planet';

@Component({
  selector: 'app-planet-edit',
  templateUrl: './planet-edit.component.html',
})
export class PlanetEditComponent implements OnInit {

  planet!: IPlanet;
  formulario: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { 
      this.formulario = this.formBuilder.group({
        name: ['',[Validators.required, Validators.minLength(2)]],
        average_temperature: [0,this.minTempValidator(-50)],
        co2: [50],
        temp_history: this.formBuilder.array([])
      },{validators: this.tempValidator});
    }

  get nameNovalid(){
    return this.formulario.get('name');
  }

  get tempHistory(){
    return <FormArray>this.formulario.get('temp_history')
  }
  getTControl(): FormControl{
    const control = this.formBuilder.control(0);
    control.setValidators(Validators.min(10));
    return control;
  }
 

  addTH(){
    (<FormArray>this.formulario.get('temp_history')).push(this.getTControl())
  }

  removeTH(i:  number){
  (<FormArray>this.formulario.get('temp_history')).removeAt(i)
  }
  ngOnInit(): void {
  this.planet = this.activatedRoute.snapshot.data['planet'];
  this.formulario.setValue({name: this.planet.name, 
    average_temperature: this.planet.average_temperature,
  co2: this.planet.co2,
temp_history: []});
  }

  editar(){

  }

  minTempValidator(minInputTemp: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } | null => {
      if (c.value) {
        console.log(c.value, minInputTemp);
        
        return c.value >= minInputTemp ? null : { 'minTemp': minInputTemp }; }
        return null; };
   }
   

  tempValidator: ValidatorFn = 
  (control: AbstractControl): ValidationErrors | null => {
    const temp = control.get('average_temperature');
    const co2 = control.get('co2');
    console.log(temp?.value, co2?.value);
    
    return temp && co2 && temp.value < (co2.value/10) ? 
    { tempValidator: true } : null;
  };
 

}
