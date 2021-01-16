import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../product/product';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cataloge',
  templateUrl: './cataloge.component.html',
})
export class CatalogeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
    // private router: Router
    // el router ja no fa falta perquè està en el component product-item
  ) { }
  products: Product[] = [];
  searchProduct: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.criterio) {
        this.productsService.searchProducts(params.criterio).subscribe(
          prods => this.products = prods, // Success function
          error => console.error(error), // Error function (optional)
          () => console.log('Products loaded', this.products) // Finally function (optional)
        );
      }
      else {
        this.productsService.getProducts().subscribe(
          prods => this.products = prods, // Success function
          error => console.error(error), // Error function (optional)
          () => console.log('Products loaded', this.products) // Finally function (optional)
        );
      }



    });

    /* this.productsService.getProducts().subscribe(
       prods => this.products = prods, // Success function
       error => console.error(error), // Error function (optional)
       () => console.log('Products loaded') // Finally function (optional)
       );*/
  }


}
