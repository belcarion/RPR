import { TestBed } from '@angular/core/testing';

import { RomeService } from './rome.service';

describe('RomeService', () => {
  let service: RomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
