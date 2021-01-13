import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LlistaPersonesComponent } from './persona/llista-persones/llista-persones.component';
import { PersonaItemComponent } from './persona/persona-item/persona-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LlistaPersonesComponent,
    PersonaItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
