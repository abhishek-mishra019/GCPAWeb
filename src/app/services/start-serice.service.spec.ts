import { TestBed } from '@angular/core/testing';

import { StartSericeService } from './start-serice.service';

describe('StartSericeService', () => {
  let service: StartSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
