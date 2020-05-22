import { TestBed } from '@angular/core/testing';

import { PhaseForumService } from './phase-forum.service';

xdescribe('PhaseForumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhaseForumService = TestBed.inject(PhaseForumService);
    expect(service).toBeTruthy();
  });
});
