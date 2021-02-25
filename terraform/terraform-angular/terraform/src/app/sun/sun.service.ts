import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Sun } from './sun';

@Injectable({
  providedIn: 'root'
})
export class SunService {

  constructor( private http: HttpClient) {   }

  sunsURL = environment.urlAPI+'sun';  // La URL la guarde en enviroment
  //postBody = `{"jsonrpc":"2.0","method":"call","params":{"f1":"player","f2":"=","f3":${localStorage.getItem('id')}}}`;
 // postOptions = { headers: new HttpHeaders({ "Content-type": "application/json; charset=UTF-8" })};


  getSuns(): Observable<Sun[]> {
    let obs: Observable<Sun[]> = // obs és de tipus Observable que retorna un array de planetes
    this.http.get<{result: Sun[]}>(this.sunsURL) 
    .pipe(map(response => response.result)) 
    return obs;
  }
}
