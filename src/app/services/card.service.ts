import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardParams } from '../models/card-params';
import { CardRes } from '../models/card-res';
import { ApiYgoService } from './api-ygo.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(
    private apiYgoService: ApiYgoService,
  ) { }
  
  getNewCards(params: CardParams): Observable<CardRes> {
    return this.apiYgoService.getCards(params);
  }
}
