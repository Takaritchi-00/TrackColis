import { TestBed } from '@angular/core/testing';

import { UserColisService } from './user-colis.service';

describe('UserColisService', () => {
  let service: UserColisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserColisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
