import { Component, OnInit } from '@angular/core';
import { IPlanet } from '../i-planet';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {

  planets: IPlanet[] = [{name: 'tierra', id: 3},
  {name:'Marte', id:4}
]
  constructor() { }

  ngOnInit(): void {
  }

}
