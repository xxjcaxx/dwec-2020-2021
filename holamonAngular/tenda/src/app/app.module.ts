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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { LoginComponent } from './components/login/login.component';
import { ResaltadoDirective } from './directives/resaltado.directive';
import { MostrarMesDirective } from './directives/mostrar-mes.directive';
import { MinPriceDirective } from './directives/validators/min-price.directive';
import { ProductNewComponent } from './product/product-new/product-new.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CatalogeComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductFilterPipe,
    ProductEditComponent,
    LoginComponent,
    ResaltadoDirective,
    MostrarMesDirective,
    MinPriceDirective,
    ProductNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService, MinPriceDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
