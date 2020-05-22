import { TestBed } from '@angular/core/testing';
import { FactionService } from './faction.service';

xdescribe('FactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactionService = TestBed.inject(FactionService);
    expect(service).toBeTruthy();
  });
});
