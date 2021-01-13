import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/interfaces/i-persona';

@Component({
  selector: 'app-llista-persones',
  templateUrl: './llista-persones.component.html',
})
export class LlistaPersonesComponent implements OnInit {
  persones: IPersona[] = [
    {nom: 'pepe', cognom: 'lopez', mostrar:true},
    {nom: 'john', cognom: 'connor', mostrar:true},
    {nom: 'antonio', cognom: 'alcantara', mostrar:false},
   ]
   
  constructor() { }

  ngOnInit(): void {
  }

}
