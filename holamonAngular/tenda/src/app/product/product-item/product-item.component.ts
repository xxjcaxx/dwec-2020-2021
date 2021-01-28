import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input() p: Product; // = { id: 1, name: 'PC', price: 300 }

  auxRatting: number;

  @Output() rattingChanged = new EventEmitter<number>();

  constructor( private router: Router) { }
  ngOnInit(): void {
    this.auxRatting = this.p.ratting;
  }
  detailsProduct(id: number): void{
    this.router.navigate(['/product', id]);
  }
  puntuar(i: number): void {
    this.rattingChanged.emit(i);
  }
}
