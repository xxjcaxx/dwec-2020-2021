import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PlanetListComponent } from './planet/planet-list/planet-list.component';
import { PlanetItemComponent } from './planet/planet-item/planet-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlanetService } from './planet/planet.service';
import { LoginComponent } from "./components/login/login.component";
import { PlanetDetailComponent } from './planet/planet-detail/planet-detail.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlanetListComponent,
    PlanetItemComponent,
    FooterComponent,
    LoginComponent,
    PlanetDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    NgxChartsModule,
  ],
  providers: [PlanetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
