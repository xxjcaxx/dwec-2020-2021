import { Injectable } from '@angular/core';
import { Product } from '../product/product';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map,filter} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productList: Product[] = [{id: 1, name: 'PC', price: 200}, {id: 2, name: 'mac', price: 300}]
  private productURL = './assets/productes.json';

  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]>{   // retorna un observable al que cal subscriure's
    return this.http.get<{products: Product[]}>(this.productURL).pipe( // get retorna un observable i pipe accepta funcions de manipulació de les dades
      map(response => response.products) // de la resposta traguem l'array que ens interessa
      );
  }
  getProduct(id: number){
    return this.http.get<{products: Product[]}>(this.productURL).pipe(
      map(response => response.products.filter(p => p.id == id)[0]), // de la resposta sols traguem el producte amb el mateix id
      );
  }
}
