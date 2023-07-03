import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user';
import { ApiYgoService } from './api-ygo.service';
import { DeckService } from './deck.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User | any;
  constructor(
    private apiYgoService: ApiYgoService,
    private deckService: DeckService,
    private cookieService: CookieService,
  ) { }

  setUser(){
    this.user = this.cookieService.getObject('user');
    console.log('user cookies', this.user);
    this.deckService.getDeckCards();
  }
  updateUser(name: string) {
    this.apiYgoService.getUser(name).subscribe({
      next: (res: User) => {
        console.log('user',res)
        this.cookieService.putObject('user',res);
        this.deckService.getDeckCards();
      }
    });
  };
}
