import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  logued: boolean = false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.logued = this.auth.isAuth();
    this.auth.isLogued().subscribe(
      l => this.logued = l
    )
  }

  logout(){
    this.auth.logOut();
    this.logued = false;
  }
}
