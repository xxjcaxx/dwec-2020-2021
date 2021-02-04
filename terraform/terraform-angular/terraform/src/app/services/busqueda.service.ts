import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  private criteri: BehaviorSubject<string>;

  constructor() { 
    this.criteri = new BehaviorSubject<string>('');
  }

  getCriteri(): Observable<string>{
    return this.criteri.asObservable();
  }

  setCriteri(c: string): void{
    this.criteri.next(c);
    //console.log(c);
    
  }

}
