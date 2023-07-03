import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-all-decks',
  templateUrl: './all-decks.component.html',
  styleUrls: ['./all-decks.component.scss']
})
export class AllDecksComponent implements OnInit {
  constructor(
    public deckService: DeckService,
  ) { }
  ngOnInit(): void {
    this.deckService.getAllDeckCards();
  }
  
}
