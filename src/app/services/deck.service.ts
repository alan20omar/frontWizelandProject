import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck';
import { ApiYgoService } from './api-ygo.service';
import { CookieService } from 'ngx-cookie';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  mensaje: string = 'No hay cartas agregadas en tu Deck';
  deck: Deck = {
    cards: [],
    _id: '',
    userId: '',
  };
  allDecks: any[] = [];
  constructor(
    private apiYgoService: ApiYgoService,
    private cookieService: CookieService,
  ) { }

  getDeckCards() {
    const user: any = this.getUser();
    if (user?._id) {
      this.apiYgoService.getDeck(user._id).subscribe({
        next: (res: Deck) => {
          console.log('Deck',res)
          this.deck = res;
        },
      });
    }
  };
  getAllDeckCards() {
    this.apiYgoService.getAllDeck().subscribe({
      next: (res: Deck[]) => {
        console.log('AllDecks',res);
        this.allDecks = res;
      },
    });
  };

  addCardToDeck(card: Card | undefined) {
    const user: any = this.getUser();
    if (user?._id) {
      this.apiYgoService.addCardToDeck(user._id, this.deck._id, card?.id ?? 0).subscribe({
        next: (res: Deck) => {
          console.log('DeckAdd',res);
          this.getDeckCards();
          alert(`${card?.name} se agrego a tu deck correctamente`);
        },
        error: (err) => {
          alert(`Ocurrio un error al agregar ${card?.name} a tu deck`);
        }
      });
    }
  };
  removeCardToDeck(card: Card | undefined) {
    const user: any = this.getUser();
    if (user?._id) {
      this.apiYgoService.deleteCardToDeck(user._id, this.deck._id, card?.id ?? 0).subscribe({
        next: (res: Deck) => {
          console.log('DeckDel',res);
          this.getDeckCards();
          alert(`${card?.name} se elimino correctamente de tu deck`);
        },
        error: (err) => {
          alert(`Ocurrio un error al eliminar ${card?.name} de tu deck`);
        }
      });
    }
  };

  getUser(){
    if (this.cookieService.hasKey('user')) {
      this.mensaje = 'No hay cartas agregadas en tu Deck';
      return this.cookieService.getObject('user');
    } else {
      this.mensaje = 'Ingresa un nombre para gregar cartas en tu deck';
    }
    return;
  };
}
