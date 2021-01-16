import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogeComponent } from './components/cataloge/cataloge.component';

//Rutes
import { AppRoutingModule } from './app-routing.module';

// Servicis
import { ProductsService } from './services/products.service';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductItemComponent } from './product/product-item/product-item.component';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CatalogeComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
