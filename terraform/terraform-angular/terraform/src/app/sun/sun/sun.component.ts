import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
})
export class SunComponent implements OnInit {

  orbits: any[] = [1,2,3];

  constructor() { }

  ngOnInit(): void {
  }

}
