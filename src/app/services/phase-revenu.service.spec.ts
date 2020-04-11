import { TestBed } from '@angular/core/testing';
import { PhaseRevenusService } from './phase-revenus.service';

describe('QqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhaseRevenusService = TestBed.get(PhaseRevenusService);
    expect(service).toBeTruthy();
  });
});
