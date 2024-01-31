import { TestBed } from '@angular/core/testing';

import { TokenSuperUserService } from './token-super-user.service';

describe('TokenSuperUserService', () => {
  let service: TokenSuperUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenSuperUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
