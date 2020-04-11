import { TestBed } from '@angular/core/testing';
import { PhaseMortaliteService } from './phase-mortalite.service';

describe('QqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhaseMortaliteService = TestBed.get(PhaseMortaliteService);
    expect(service).toBeTruthy();
  });
});
