import { TestBed } from '@angular/core/testing';

import { AuthGuardSuperUserGuard } from './auth-guard-super-user.guard';

describe('AuthGuardSuperUserGuard', () => {
  let guard: AuthGuardSuperUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardSuperUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
