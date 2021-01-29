import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from './i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  auth(user: IUser): Observable<IUser>{
    return this.http.get<IUser>('/assets/user.json')
    .pipe(map(u =>{
      if (u.token) localStorage.setItem('token',u.token);
      return u;
    }));
  }

  isAuth(): boolean{
    if (localStorage.getItem('token')){
      //console.log(localStorage.getItem('token'));
      
      return true;
    }
    else{
      return false;
    }
  }

  isLogued(): Observable<boolean>{
    const logObservable = new Observable<boolean>(
      observer =>{
        let logued: boolean;
        if (localStorage.getItem('token')) logued = true;
        else logued = false;

        observer.next(logued);
       
      }
    );
    return logObservable;
  }

  logOut(){
    localStorage.removeItem('token');
  }
}
