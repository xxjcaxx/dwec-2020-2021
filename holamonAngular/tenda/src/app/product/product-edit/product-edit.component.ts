import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductsService } from '../../services/products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {

  product: Product;

  @ViewChild('editForm', {static: true}) editForm: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private router: Router ) { }

  ngOnInit(): void {
  this.product = this.activatedRoute.snapshot.data['product'];
  console.log(this.product);

  }

  editar(){
    // Les validacions que calguen
    console.log(this.editForm.valid);

    this.productService.editProduct(this.product).subscribe(
      ok => this.router.navigate(['/product/',this.product.id])
    )
  }

}
