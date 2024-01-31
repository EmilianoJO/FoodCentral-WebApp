import { TestBed } from '@angular/core/testing';

import { TokenOwnerService } from './token-owner.service';

describe('TokenOwnerService', () => {
  let service: TokenOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
