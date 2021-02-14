import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Placa } from './placa';
import {map,filter, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PlaquesService {

  constructor(private http: HttpClient) { }

  plaquesURL = 'http://localhost:3000';

  getPlaques(): Observable<Placa[]>{   // retorna un observable al que cal subscriure's
  return this.http.get<Placa[]>(this.plaquesURL+'/plaques/').pipe( // get retorna un observable i pipe accepta funcions de manipulació de les dades
    map(response => response) // de la resposta traguem l'array que ens interessa
    );
}

getPlaca(id:string): Observable<Placa>{
     // retorna un observable al que cal subscriure's
return this.http.get<Placa[]>(this.plaquesURL+'/plaques/').pipe( // get retorna un observable i pipe accepta funcions de manipulació de les dades
  map(response => {
   // console.log(response);
//console.log(response.filter(p => p.id === id)[0]);
//
    return response.filter(p => p.id === id)[0];}) // de la resposta traguem l'array que ens interessa
  );
}

editPlaca(placa: Placa): Observable<Placa>{
  const headers = { 'content-type': 'application/json'}
  const body=JSON.stringify(placa);
  return this.http.put<Placa>('http://localhost:3000/plaques/'+placa.id,body,{'headers':headers});

}
}
