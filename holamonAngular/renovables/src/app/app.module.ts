import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PlaquesListComponent } from './plaques/plaques-list/plaques-list.component';
import { PlaquesItemComponent } from './plaques/plaques-item/plaques-item.component';
import { HomeComponent } from './components/home/home.component';
import { PlaquesService } from './plaques/plaques.service';
import { HttpClientModule } from '@angular/common/http';
import { PlaquesDetailComponent } from './plaques/plaques-detail/plaques-detail.component';
import { ToKWPipe } from './plaques/to-kw.pipe';
import { FilterPlaquesPipe } from './plaques/filter-plaques.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MostrarMesDirective } from './directives/mostrar-mes.directive';
import { ForDelayDirective } from './directives/for-delay.directive';
import { PlaquesEditComponent } from './plaques/plaques-edit/plaques-edit.component';
import { MinPowerDirective } from './directives/validators/min-power.directive';
import { PlaquesNewComponent } from './plaques/plaques-new/plaques-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaquesListComponent,
    PlaquesItemComponent,
    HomeComponent,
    PlaquesDetailComponent,
    ToKWPipe,
    FilterPlaquesPipe,
    LoginComponent,
    MostrarMesDirective,
    ForDelayDirective,
    PlaquesEditComponent,
    MinPowerDirective,
    PlaquesNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlaquesService, MinPowerDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
