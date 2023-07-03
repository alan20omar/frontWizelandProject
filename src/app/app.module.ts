import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DeckComponent } from './deck/deck.component';
import { LandingComponent } from './landing/landing.component';
import { CardComponent } from './shared/components/card/card.component';
import { CookieModule } from 'ngx-cookie';
import { AllDecksComponent } from './all-decks/all-decks.component';
// Angular materials
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// Socket IO
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DeckComponent,
    LandingComponent,
    CardComponent,
    AllDecksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CookieModule.withOptions(),
    // Angular Materials
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    // Socket
    SocketIoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
