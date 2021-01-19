import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlanet } from '../i-planet';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.css']
})
export class PlanetDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  planet!: IPlanet;
  image = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      this.planet = {name: 'asdfsf', id: p.id}
      console.log(p.id);
    });
    if (this.planet.image !== undefined) {
      this.image = `data:image/jpg;base64,${this.planet.image}`
    }
    else {
        this.image = '/assets/img/default-placeholder.png'
    }
   
    
  }
}
