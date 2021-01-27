import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router,
    public authservice: AuthService) { }
  logueado: boolean = false;

  ngOnInit(): void {
    this.logueado = this.authservice.estaAutenticado();
  }

  buscarProducte( criteri: string): void{
    //console.log('navbar',{criteri});
    this.router.navigate(['/cataloge', criteri]);
  }

  logout(){
    this.authservice.logout();
  }

}
