import { Component, OnInit, Input } from '@angular/core';
import { IPlanet } from '../i-planet';


@Component({
  selector: 'app-planet-item',
  templateUrl: './planet-item.component.html',
  styleUrls: ['./planet-item.component.css']
})
export class PlanetItemComponent implements OnInit {
  @Input() planet!: IPlanet;
  constructor() { }

  ngOnInit(): void {
  }

}
