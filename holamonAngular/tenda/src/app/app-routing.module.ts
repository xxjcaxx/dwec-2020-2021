import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogeComponent } from './components/cataloge/cataloge.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductDetailGuard } from './product/guards/product-detail.guard';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { LeavePageGuard } from './product/guards/leave-page.guard';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
 { path: 'home', component: HomeComponent},
 { path: 'cataloge',
 canActivate: [AuthGuard],
 component: CatalogeComponent},
 { path: 'login', component: LoginComponent},
 { path: 'cataloge/:criterio', component: CatalogeComponent},
 { path: 'product/:id',
 canActivate: [ProductDetailGuard],
 component: ProductDetailComponent},
 { path: 'product/edit/:id',
 canActivate: [ProductDetailGuard],
 canDeactivate: [LeavePageGuard],
 component: ProductEditComponent},
 { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
