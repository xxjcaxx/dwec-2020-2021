import { Injectable } from '@angular/core';
import { Product } from './product';
import { ProductsService } from '../services/products.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {


  constructor(private productsService: ProductsService, private router: Router) { }


  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product>
  {
  return this.productsService.getProduct(route.params.id).pipe(
    catchError(error => {this.router.navigate(['/products']);
    return of(null);
  })
   );
  }
}
