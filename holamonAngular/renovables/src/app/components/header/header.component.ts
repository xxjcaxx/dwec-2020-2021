import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
  this.auth.logOut();
  }

}
