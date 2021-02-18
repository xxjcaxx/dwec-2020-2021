import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  user: User = {login: "", passwd: ""};
  recordar = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('login')){
      this.user.login = localStorage.getItem('login');
      this.recordar = true;
    }
  }


  login($event){


  this.auth.authUser(this.user,this.recordar).subscribe(
  u => {
    console.log(u);
    this.user = u;
  },
  e => console.log(e)
  );
  }
}
