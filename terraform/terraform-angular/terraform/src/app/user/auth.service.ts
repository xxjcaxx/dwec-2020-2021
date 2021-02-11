import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  authOdoo(user: IUser): Observable<any>{   // Autenticació en Odoo, aquest envia una cookie, pero si és cross origin no la guarda. 
    const URL = 'http://10.100.23.100:8069/terraform/session/authenticate';  // La URL la guarde en enviroment
    const postBody = `{"jsonrpc": "2.0", "params":{"db":"proves","login":"admin", "password": "12734"}}`;
    const postOptions = { headers: new HttpHeaders({ "Content-type": "application/json; charset=UTF-8" })};
    return this.http.post<any>(URL,postBody,postOptions)
    .pipe(map(u =>{
      console.log(u);
      return u;
    }));
  }

  authServer(user: IUser): Observable<any>{   // Autenticació en Odoo personalitzada, Odoo genera un token. (El token és si o no) ;P
    const URL = 'http://10.100.23.100:8069/terraform/terraform/login';  // La URL la guarde en enviroment
    const postBody = `{"jsonrpc": "2.0", "params":{"user":"${user.name}", "password": "${user.passwd}"}}`;
    const postOptions = { headers: new HttpHeaders({ "Content-type": "application/json; charset=UTF-8" })};
    return this.http.post<{result: {login: string, id: string}}>(URL,postBody,postOptions)
    .pipe(map(u =>{
      console.log(u);
      if (u.result.login == 'si') {
        localStorage.setItem('token',u.result.login);
        localStorage.setItem('id',u.result.id);
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
