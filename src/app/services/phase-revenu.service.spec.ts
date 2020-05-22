import { TestBed } from '@angular/core/testing';
import { PhaseRevenusService } from './phase-revenus.service';

xdescribe('QqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhaseRevenusService = TestBed.inject(PhaseRevenusService);
    expect(service).toBeTruthy();
  });
});
