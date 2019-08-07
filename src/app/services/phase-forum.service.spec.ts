import { TestBed } from '@angular/core/testing';

import { PhaseForumService } from './phase-forum.service';

describe('PhaseForumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhaseForumService = TestBed.get(PhaseForumService);
    expect(service).toBeTruthy();
  });
});
