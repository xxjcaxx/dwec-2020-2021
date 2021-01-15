import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map,filter} from 'rxjs/operators'
import { IPlanet } from './i-planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  planetsURL = 'http://10.100.23.100:8069/terraform/terraform/terraform.planet';
  postBody = `{"jsonrpc":"2.0","method":"call","params":{"f1":"id","f2":"<=","f3":8308}}`;
  postOptions = { headers: new HttpHeaders({ "Content-type": "application/json; charset=UTF-8" })};

  constructor( private http: HttpClient) { }

 /* getPlanets(): Observable<IPlanet[]>{
   return this.http.post<planets: IPlanet[]>(this.planetsURL,this.postBody,this.postOptions).pipe(
      map(response => response.planets)
   );
  }*/
    getPlanets(): void{
      console.log('getplanets');
      
      let obs: Observable<IPlanet[]> = this.http.post<IPlanet[]>(this.planetsURL,this.postBody,this.postOptions)

      obs.subscribe(
        a=> console.log(a),
        e=>console.log(e),
        ()=>console.log('log')
        );

  }
}
