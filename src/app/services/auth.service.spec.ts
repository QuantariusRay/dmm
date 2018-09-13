import { TestBed, inject } from '@angular/core/testing';

import { LoginServiceService } from './auth.service';

describe('LoginServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginServiceService]
    });
  });

  it('should be created', inject([LoginServiceService], (service: LoginServiceService) => {
    expect(service).toBeTruthy();
  }));
});
