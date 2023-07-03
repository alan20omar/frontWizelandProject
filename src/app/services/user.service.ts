import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { ApiYgoService } from './api-ygo.service';
import { DeckService } from './deck.service';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User | any;
  socketSub: any;
  socketMsgSubject: Subject<string> = new Subject<string>();;
  constructor(
    private apiYgoService: ApiYgoService,
    private deckService: DeckService,
    private cookieService: CookieService,
    private socket: WebSocketService,
  ) { }

  setUser(){
    this.user = this.cookieService.getObject('user');
    console.log('user cookies', this.user);
    this.deckService.getDeckCards();
    this.socket.connect(this.user?._id ?? '__none__');
    this.getNotify();
  }
  updateUser(name: string) {
    this.apiYgoService.getUser(name).subscribe({
      next: (res: User) => {
        console.log('updateUser',res);
        this.cookieService.putObject('user',res);
        this.user = res;
        this.deckService.getDeckCards();
        this.socket.connect(this.user?._id ?? '__none__');
        this.getNotify();
      }
    });
  };
  notifyFavorite(userId: string) {
    this.apiYgoService.getNotifyFavorite(this.user.name, userId).subscribe({
      next: (res: User) => {
        console.log('likedUser',res);
      }
    });;
  };
  getNotify() {
    this.socketSub = this.socket.getMessage().subscribe({
      next: (res: any) => {
        console.log('res', res)
        this.socketMsgSubject.next(res.msg);
      }
    });
  };
}
