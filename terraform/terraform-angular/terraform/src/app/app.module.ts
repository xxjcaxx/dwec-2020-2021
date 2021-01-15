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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlanetListComponent,
    PlanetItemComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
  ],
  providers: [PlanetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
