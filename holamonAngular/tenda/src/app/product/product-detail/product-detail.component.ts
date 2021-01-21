import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
product: Product;
  constructor( private activatedRoute: ActivatedRoute,
               private productsService: ProductsService ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
    this.productsService.getProduct(params.id).subscribe(p=> this.product = p);
    });
  }

}
