import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-decks',
  templateUrl: './all-decks.component.html',
  styleUrls: ['./all-decks.component.scss']
})
export class AllDecksComponent implements OnInit {
  constructor(
    public deckService: DeckService,
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    this.deckService.getAllDeckCards();
  }
  notifyFavorite(userId: string) {
    this.userService.notifyFavorite(userId);
  }
}
