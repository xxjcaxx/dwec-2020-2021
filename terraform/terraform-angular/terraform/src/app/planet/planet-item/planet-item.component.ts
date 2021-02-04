import { Component, OnInit, Input } from '@angular/core';
import { IPlanet } from '../i-planet';


@Component({
  selector: 'app-planet-item',
  templateUrl: './planet-item.component.html',

})
export class PlanetItemComponent implements OnInit {
  @Input() planet!: IPlanet;
  image = '';
  color = "#eeeeee";
  constructor() { }

  ngOnInit(): void {
<<<<<<< HEAD
    this.color = ['red', 'orange', 'blue'][Math.floor(Math.random() * 3)];
=======
    //this.color = ['red','orange','blue'][Math.floor(Math.random()*3)];
>>>>>>> dca68d4f43717862de77cd43c6e9dddd79e952ea
    if (this.planet.image !== undefined) {
      this.image = `data:image/jpg;base64,${this.planet.image}`
    }
    else {
      this.image = '/assets/img/default-placeholder.png'
    }
    if (!this.planet.average_temperature) this.planet.average_temperature = 0;
  }

}
