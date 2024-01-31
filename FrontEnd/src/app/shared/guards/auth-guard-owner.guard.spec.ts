import { TestBed } from '@angular/core/testing';

import { AuthGuardOwnerGuard } from './auth-guard-owner.guard';

describe('AuthGuardOwnerGuard', () => {
  let guard: AuthGuardOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
