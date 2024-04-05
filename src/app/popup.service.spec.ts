import { TestBed } from '@angular/core/testing';

import { PopUpService } from './popup.service';

describe('MarkerService', () => {
  let service: PopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
