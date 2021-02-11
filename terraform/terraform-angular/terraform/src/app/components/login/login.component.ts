import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { IUser } from 'src/app/user/i-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = {name: "", passwd: ""};

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }

  login(): void{
  this.auth.auth(this.user).subscribe(
    u => {this.user = u;
    this.router.navigate(['/home']);
    },
    error => console.log(error),
    () => console.log('login') 
  );
  }

  loginOdoo(){
    this.auth.authServer(this.user).subscribe(
      u => console.log(u)
      
    );
  }

}
