import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CardRes } from '../models/card-res';
import { ApiYgoService } from './api-ygo.service';

import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test_happy_path_returns_observable', () => {
    const mockCardRes: CardRes = {
        data: [],
        meta: {
        }
    };
    spyOn(TestBed.inject(ApiYgoService), 'getCards').and.returnValue(of(mockCardRes));
    const result = service.getNewCards({});
    expect(result).toEqual(jasmine.any(Observable));
  });
});
