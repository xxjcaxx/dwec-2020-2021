import { Component, OnInit } from '@angular/core';
import { IPlanet } from '../i-planet';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',

})
export class PlanetListComponent implements OnInit {

  planets: IPlanet[] = []; 
  constructor( private planetService: PlanetService) { }

  ngOnInit(): void {
  //  this.planets = this.planetService.getPlanets();
  this.planetService.getPlanets();
  }

}
