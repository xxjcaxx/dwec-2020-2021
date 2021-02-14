import { Component, OnInit } from '@angular/core';
import { Placa } from '../placa';
import { PlaquesService } from '../plaques.service';

@Component({
  selector: 'app-plaques-list',
  templateUrl: './plaques-list.component.html',
})
export class PlaquesListComponent implements OnInit {

  plaques: Placa[] = [
   /*{id: 'placa1', power: 400},
    {id: 'placa2', power: 450},
    {id: 'placa3', power: 300},
    {id: 'placa4', power: 100}*/
  ];

  criteri: string = '';

  constructor( private plaquesService: PlaquesService) { }

  ngOnInit(): void {
    this.plaquesService.getPlaques().subscribe(
      plaques => this.plaques = plaques
    )
  }

}
