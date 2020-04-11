import { TestBed } from '@angular/core/testing';
import { RomeService } from './rome.service';

describe('QqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RomeService = TestBed.get(RomeService);
    expect(service).toBeTruthy();
  });
});
