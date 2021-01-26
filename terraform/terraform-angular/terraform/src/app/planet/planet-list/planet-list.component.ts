import { Component, OnInit } from '@angular/core';
import { IPlanet } from '../i-planet';
import { PlanetService } from '../planet.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',

})
export class PlanetListComponent implements OnInit {

  planets: IPlanet[] = [];
  constructor( private planetService: PlanetService) { }

  ngOnInit(): void {
  this.planets = [{name: 'Loading', image: undefined, id: 0}];
  this.planetService.getPlanets() // retorna un obsrevable que retorna un array de planetes
   .subscribe( // als observables es pot subscriure. En aquest moment s'executarà
    plnt => this.planets = plnt, // Si funciona
    error => this.showError(error), // Si no funciona
    () => console.log('Planets loaded') // En qualsevol cas
   );
  }

  showError(error: string): void {
  this.planets = [{name: 'Error', image: undefined, id: 0}];
  }

  criteri: string = "";

}
