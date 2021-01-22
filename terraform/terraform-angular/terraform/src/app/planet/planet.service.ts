import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map,filter} from 'rxjs/operators'
import { IPlanet } from './i-planet';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  planetsURL = environment.url+'terraform.planet';  // La URL la guarde en enviroment
  postBody = `{"jsonrpc":"2.0","method":"call","params":{"f1":"player","f2":"=","f3":26}}`;
  postOptions = { headers: new HttpHeaders({ "Content-type": "application/json; charset=UTF-8" })};

  constructor( private http: HttpClient) { }

    getPlanets(): Observable<IPlanet[]> {
      let obs: Observable<IPlanet[]> = // obs és de tipus Observable que retorna un array de planetes
      this.http.post<{result: IPlanet[]}> // El post retorna un objecte que té un atribut anomenat result
      // que és un array de planetes
      (this.planetsURL,this.postBody,this.postOptions) // el POST necessita url, body i opcions
      .pipe(map(response => response.result)) // al resultat, amb pipe se li passa la funció fletxa
      // per a extraure de la resposta l'atribut que és l'array de planetes
    /* obs.subscribe(
        a=> console.log(a),
        e=>console.log(e),
        ()=>console.log('log')
        );*/
      return obs;
  }
  getPlanet(id: number): Observable<IPlanet>{
    return this.http.post<{result: IPlanet[]}>
    (`${this.planetsURL}/${id}`,this.postBody,this.postOptions)
    .pipe(map(response => response.result[0] ));
  }
}
