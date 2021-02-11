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
  getProduct(id: number): Observable<Product>{
    return this.http.get<{products: Product[]}>(this.productURL).pipe(
      map(response => {
        let resp = response.products.filter(p => p.id == id)[0]
        return resp;
      } ), // de la resposta sols traguem el producte amb el mateix id
      );
  }

  editProduct(p: Product): Observable<boolean>{
    return this.http.get<boolean>(this.productURL);  // no funciona però cal fer alguna funció
  }

  searchProducts(criteri: string): Observable<Product[]>{
    criteri = criteri.toLowerCase();
    console.log({criteri});
    return this.http.get<{products: Product[]}>(this.productURL).pipe(
      map(response => response.products.filter(p => p.name.toLocaleLowerCase().includes(criteri))),
      );
  }
}
