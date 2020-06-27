import { TestBed } from '@angular/core/testing';
import { PhaseRevenusService } from './phase-revenus.service';
import { RomeService } from './rome.service';

fdescribe('PhaseRevenusService', () => {
  let service: PhaseRevenusService;
  let romeServiceSpy: any;
  let factionServiceSpy: any;

  beforeEach(() => {
    romeServiceSpy = jasmine.createSpyObj('RomeService', ['getRandomNumber']);
    factionServiceSpy = jasmine.createSpyObj('FactionService', ['retireSenateurMort']);
    TestBed.configureTestingModule({

      providers: [
        // { provide: FactionService, useValue: factionServiceSpy },
        { provide: RomeService, useValue: romeServiceSpy }
      ]
    });
    service = TestBed.inject(PhaseRevenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    romeServiceSpy.getRandomNumber.and.returnValue(3);
  });

});
