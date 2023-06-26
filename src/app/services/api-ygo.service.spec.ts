import { TestBed } from '@angular/core/testing';

import { ApiYgoService } from './api-ygo.service';

describe('ApiYgoService', () => {
  let service: ApiYgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiYgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
