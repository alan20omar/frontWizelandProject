import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit{
  constructor(
    public deckService: DeckService,
  ) {
    
  }
  ngOnInit(): void {
    // this.deckService.getDeckCards();
  }

}
