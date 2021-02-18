import { Component, Input, OnInit } from '@angular/core';
import { Placa } from '../placa';

@Component({
  selector: 'app-plaques-item',
  templateUrl: './plaques-item.component.html',

})
export class PlaquesItemComponent implements OnInit {

  @Input() placa: Placa;
  mostrarMes: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
