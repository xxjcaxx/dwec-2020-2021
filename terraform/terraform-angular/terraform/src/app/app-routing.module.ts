import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PlanetDetailComponent } from './planet/planet-detail/planet-detail.component';
import { PlanetListComponent } from './planet/planet-list/planet-list.component';
import { SunComponent } from './sun/sun/sun.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'planets',
  canActivate: [AuthGuard], 
  component: PlanetListComponent},
  {path: 'suns', 
  canActivate: [AuthGuard], 
  component: SunComponent},
  {path: 'planet/:id', 
  canActivate: [AuthGuard], 
  component: PlanetDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
