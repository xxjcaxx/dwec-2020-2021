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
import { TemperaturePipe } from './pipes/temperature.pipe';
import { FilterPlanetPipe } from './planet/pipes/filter-planet.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SunComponent } from './sun/sun/sun.component';
import { ResaltadoDirective } from './directives/resaltado.directive';
import { MostrarGraficaDirective } from './directives/mostrar-grafica.directive';
import { ForDelayDirective } from './directives/for-delay.directive';
import { GraphsComponent } from './components/graphs/graphs.component';
import { PlanetEditComponent } from './planet/planet-edit/planet-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlanetListComponent,
    PlanetItemComponent,
    FooterComponent,
    LoginComponent,
    PlanetDetailComponent,
    TemperaturePipe,
    FilterPlanetPipe,
    SunComponent,
    ResaltadoDirective,
    MostrarGraficaDirective,
    ForDelayDirective,
    GraphsComponent,
    PlanetEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlanetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
