import { Component, OnInit } from '@angular/core';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  logued: boolean = false;
  criteri: string = '';

  constructor(private auth:AuthService, private busqueda: BusquedaService) { }

  ngOnInit(): void {
    this.logued = this.auth.isAuth();
    this.auth.isLogued().subscribe(
      l => { //console.log('observable');
       this.logued = l}
    )
   
  }

  islogued(): boolean{
   // console.log('islogued');
    return this.auth.isAuth()
  }

  logout(){
    this.auth.logOut();
    this.logued = false;
  }

  canviarCriteri(){
  //  console.log(this.criteri);
    
    this.busqueda.setCriteri(this.criteri);
  }
}
