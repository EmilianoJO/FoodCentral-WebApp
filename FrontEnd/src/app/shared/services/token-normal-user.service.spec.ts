import { TestBed } from '@angular/core/testing';

import { TokenNormalUserService } from './token-normal-user.service';

describe('TokenNormalUserService', () => {
  let service: TokenNormalUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenNormalUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
