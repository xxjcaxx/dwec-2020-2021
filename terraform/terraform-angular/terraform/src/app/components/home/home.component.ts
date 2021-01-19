import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  imgY: number = 100 

  @HostListener("window:scroll", ['$event'])
  homeScroll($event:Event){
    let scrollOffset = window.scrollY;
    this.imgY = 100 - scrollOffset/2;
    if (this.imgY < 0) { this.imgY = 20}    
  }

  routePlanets(): void{
  this.router.navigate(['planets']);
  }

}
