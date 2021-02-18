import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlaquesListComponent } from './plaques/plaques-list/plaques-list.component';
import { PlaquesDetailComponent } from './plaques/plaques-detail/plaques-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './user/auth.guard';
import { PlaquesEditComponent } from './plaques/plaques-edit/plaques-edit.component';
import { Placa } from './plaques/placa';
import { PlaquesResolveService } from './plaques/plaques-resolve.service';
import { PlaquesNewComponent } from './plaques/plaques-new/plaques-new.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'plaques',
  canActivate: [AuthGuard],
  component: PlaquesListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'placa/:id', component: PlaquesDetailComponent},

  {path: 'placa/edit/:id',
  canActivate: [AuthGuard],
  resolve: { placa: PlaquesResolveService},
  component: PlaquesEditComponent},

  {path: 'plaques/new',
  canActivate: [AuthGuard],
  component: PlaquesNewComponent},

  {path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
