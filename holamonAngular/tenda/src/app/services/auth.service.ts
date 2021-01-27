import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  url = "/assets/usuari.json"

  authUser(usuario: User, recordar: Boolean): Observable<User>{
    /*   ///////////// Mètode si fora un servidor real
    const authData = { ...usuario};
    return this.http.post(this.url,authData);

    */
   recordar ? localStorage.setItem('login',usuario.login): localStorage.removeItem('login');
   return this.http.get<User>(this.url).pipe(map( u => {
     this.guardarToken(u.token);
     return u;
  }));
  }


  private guardarToken(token:string): void{
    localStorage.setItem('token', token);
  }

  leerToken(){
    if (localStorage.getItem('token')){
      return localStorage.getItem('token');
    }
    else {
      return "";
    }
  }

  estaAutenticado(): boolean{

    if (this.leerToken().length > 2) {
      console.log(this.leerToken());

      return true;
    }
    else {
      console.log(this.leerToken());

      return false
    }
  }

  logout(): void{
    localStorage.removeItem('token');
  }


}
