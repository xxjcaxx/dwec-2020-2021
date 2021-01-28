import { Component, OnInit, Input } from '@angular/core';
import { IPlanet } from '../i-planet';


@Component({
  selector: 'app-planet-item',
  templateUrl: './planet-item.component.html',

})
export class PlanetItemComponent implements OnInit {
  @Input() planet!: IPlanet;
  image = '';
  constructor() { }

  ngOnInit(): void {
    if (this.planet.image !== undefined) {
      this.image = `data:image/jpg;base64,${this.planet.image}`
    }
    else {
        this.image = '/assets/img/default-placeholder.png'
    }
    if (! this.planet.average_temperature) this.planet.average_temperature = 0;
  }

}
