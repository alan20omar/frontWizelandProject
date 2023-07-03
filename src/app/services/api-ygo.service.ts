import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_YGO_BASE_URL } from 'src/environments/environment';

import { CardParams } from '../models/card-params';
import { CardRes } from '../models/card-res';
import { User } from '../models/user';
import { Deck } from '../models/deck';

@Injectable({
  providedIn: 'root'
})
export class ApiYgoService {
  constructor(
    private httpclient: HttpClient,
  ) { }
    // Cartas
  getCards(options: CardParams): Observable<CardRes> {
    let params: HttpParams = new HttpParams();
    Object.entries(options).forEach(opt => {
      params = params.set(opt[0], opt[1]);
    });
    return this.httpclient.get<CardRes>(`${API_YGO_BASE_URL}/card`, { params });
  };
  // User
  getUser(name: string): Observable<User> {
    const params = {
      name,
    }
    return this.httpclient.get<User>(`${API_YGO_BASE_URL}/user`, { params });
  };
  // Deck
  getDeck(userId: string): Observable<Deck>{
    const params = {
      userId,
    };
    return this.httpclient.get<Deck>(`${API_YGO_BASE_URL}/deck/user`, { params });
  };
  getAllDeck(): Observable<Deck[]>{
    return this.httpclient.get<Deck[]>(`${API_YGO_BASE_URL}/deck/`);
  };
  addCardToDeck(userId: string, deckId: string, cartaId: number): Observable<Deck>{
    const body = {
      userId,
      deckId,
      cartaId,
    };
    return this.httpclient.post<Deck>(`${API_YGO_BASE_URL}/deck/card`, body);
  }
  deleteCardToDeck(userId: string, deckId: string, cartaId: number): Observable<Deck>{
    const params = {
      userId,
      deckId,
      cartaId,
    };
    return this.httpclient.delete<Deck>(`${API_YGO_BASE_URL}/deck/card`, { params });
  }
  // Favorite
  getNotifyFavorite(name: string, likedUser: string): Observable<any> {
    const params = {
      name,
      likedUser,
    };
    return this.httpclient.get<any>(`${API_YGO_BASE_URL}/favorite`, { params });
  }
}
