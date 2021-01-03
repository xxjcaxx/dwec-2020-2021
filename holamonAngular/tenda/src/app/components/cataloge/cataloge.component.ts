import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../product/product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cataloge',
  templateUrl: './cataloge.component.html',
})
export class CatalogeComponent implements OnInit {

  constructor( private productsService: ProductsService,
               private router: Router) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      prods => this.products = prods, // Success function
      error => console.error(error), // Error function (optional)
      () => console.log('Products loaded') // Finally function (optional)
      );
  }


}
