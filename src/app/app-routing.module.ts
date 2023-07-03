import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDecksComponent } from './all-decks/all-decks.component';
import { DeckComponent } from './deck/deck.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'decks', component: DeckComponent},
  {path: 'all-decks', component: AllDecksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
