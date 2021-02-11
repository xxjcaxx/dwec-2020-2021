import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
        average_temperature: [0]
      });
    }

  get nameNovalid(){
    return this.formulario.get('name')!.invalid 
    && this.formulario.get('name')!.touched
  }

  ngOnInit(): void {
  this.planet = this.activatedRoute.snapshot.data['planet'];
  }

  editar(planetForm: NgForm){

  }

}
