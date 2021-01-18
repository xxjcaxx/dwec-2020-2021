import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginURL = environment.url+'res.partner';
  postBody = `{"jsonrpc":"2.0","method":"call","params":{"f1":"id","f2":"<=","f3":8308}}`;
  postOptions = { headers: new HttpHeaders({ "Content-type": "application/json; charset=UTF-8" })};


  constructor( private http: HttpClient) { }

  login(user: string,password: string): string {
    return 'login';
  }

}
