import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from './i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this.loguedInfo = new BehaviorSubject<boolean>(false);
  }

  auth(user: IUser): Observable<IUser>{
    return this.http.get<IUser>('/assets/user.json')
    .pipe(map(u =>{
      if (u.token) {
        localStorage.setItem('token',u.token);
        this.loguedInfo.next(true)
    }
      return u;
    }));
  }

  isAuth(): boolean{
    if (localStorage.getItem('token')){
      //console.log(localStorage.getItem('token'));
      this.loguedInfo.next(true);
      return true;
    }
    else{
      this.loguedInfo.next(false);
      return false;
    }
  }
  private loguedInfo: BehaviorSubject<boolean>;
  isLogued(): Observable<boolean>{
    return this.loguedInfo.asObservable()
  }

  logOut(){
    localStorage.removeItem('token');
    this.loguedInfo.next(false);
  }
}
