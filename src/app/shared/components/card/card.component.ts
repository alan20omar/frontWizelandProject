import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card?: Card;
  @Input() remove?: boolean;
  constructor(
    private deckService: DeckService,
  ) { }
  addCard(card: Card | undefined) {
    this.deckService.addCardToDeck(card);
  }
  removeCard(card: Card | undefined) {
    this,this.deckService.removeCardToDeck(card);
  }
}
