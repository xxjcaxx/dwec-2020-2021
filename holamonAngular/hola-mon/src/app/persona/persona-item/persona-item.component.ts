import { Component, Input, OnInit } from '@angular/core';
import { IPersona } from 'src/app/interfaces/i-persona';

@Component({
  selector: 'app-persona-item',
  templateUrl: './persona-item.component.html',
})
export class PersonaItemComponent implements OnInit {
  @Input() p!: IPersona;
  constructor() { }

  ngOnInit(): void {
  }

}
