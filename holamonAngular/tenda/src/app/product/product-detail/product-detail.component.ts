import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
product: Product;

  constructor( private activatedRoute: ActivatedRoute,
               private productsService: ProductsService,
               private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
    this.productsService.getProduct(params.id)
    .subscribe(p=> {
      this.product = p;});
    });
  }

  edit() {this.router.navigate(['/product/edit', this.product.id]);  }

}
