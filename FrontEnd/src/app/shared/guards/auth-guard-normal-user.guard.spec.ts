import { TestBed } from '@angular/core/testing';

import { AuthGuardNormalUserGuard } from './auth-guard-normal-user.guard';

describe('AuthGuardNormalUserGuard', () => {
  let guard: AuthGuardNormalUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardNormalUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
