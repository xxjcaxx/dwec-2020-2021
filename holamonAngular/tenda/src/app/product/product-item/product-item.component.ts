import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input() p: Product; // = { id: 1, name: 'PC', price: 300 }
  constructor( private router: Router) { }
  ngOnInit(): void {
  }
  detailsProduct(id: number): void{
    this.router.navigate(['/product', id]);
  }
}
