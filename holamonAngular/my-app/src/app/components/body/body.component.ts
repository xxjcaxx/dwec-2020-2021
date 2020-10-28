import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  ////////// Per al ngIF
  mostrar = true;

  frase: any = {
    mensaje: 'El ordenador nació para resolver problemas que antes no existían.',
    autor: 'Bill Gates'
  };
// Per al ngFor

citas: string[] = ['Computer science is no more about computers than astronomy is about telescopes. Dijkstra',
'Only wimps use tape backup: _real_ men just upload their important stuff on ftp, and let the rest of the world mirror it. Torvalds',
'Es más fácil viajar en un avión, incluso pilotarlo, que entender por qué puede volar. Von Neumann'];

  constructor() { }

  ngOnInit(): void {
  }


}

