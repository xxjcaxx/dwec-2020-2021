import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogeComponent } from './components/cataloge/cataloge.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';


const routes: Routes = [
 { path: 'home', component: HomeComponent},
 { path: 'cataloge', component: CatalogeComponent},
 { path: 'cataloge/:criterio', component: CatalogeComponent},
 { path: 'product/:id', component: ProductDetailComponent},
 { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
