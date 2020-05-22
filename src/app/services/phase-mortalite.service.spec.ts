import { TestBed } from '@angular/core/testing';
import { PhaseMortaliteService } from './phase-mortalite.service';
import { FactionService } from './faction.service';
import { AppModule } from '../app.module';
import { RomeService } from './rome.service';

describe('PhaseMortaliteService', () => {
  let service: PhaseMortaliteService;
  let romeServiceSpy: any;
  let factionServiceSpy: any;

  beforeEach(() => {
    romeServiceSpy = jasmine.createSpyObj('RomeService', ['getRandomNumber']);
    factionServiceSpy = jasmine.createSpyObj('FactionService', ['retireSenateurMort']);
    TestBed.configureTestingModule({

      providers: [
        { provide: FactionService, useValue: factionServiceSpy },
        { provide: RomeService, useValue: romeServiceSpy }
      ]
    });
    service = TestBed.inject(PhaseMortaliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should test resolutionMortalite', () => {
    romeServiceSpy.getRandomNumber.and.returnValue(33);
    service.resolutionMortalite();
    expect(factionServiceSpy.retireSenateurMort).toHaveBeenCalledWith([]);
    romeServiceSpy.getRandomNumber.and.returnValue(8);
    service.resolutionMortalite();
    expect(factionServiceSpy.retireSenateurMort).toHaveBeenCalledWith([8]);
  });
});
