import { Component, OnInit } from '@angular/core';
import { Sun } from '../sun';
import { SunService } from '../sun.service';

interface Orbit {
  cx: number;
  cy: number;
  r: number;
}


@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
})
export class SunComponent implements OnInit {

  orbits: Orbit[] = [
    {cx: 350, cy: 350, r: 100},
    {cx: 350, cy: 350, r: 200},
    {cx: 350, cy: 350, r: 300},
  ];

  suns: Sun[] = [];

  constructor(private sunService: SunService) { }

  ngOnInit(): void {
    this.sunService.getSuns().subscribe(
      s => this.suns = s,
      error => console.log(error),
      ()=> console.log('suns loaded')
      
      
    )
  }

}
