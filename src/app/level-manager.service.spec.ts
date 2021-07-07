import { TestBed } from '@angular/core/testing';

import { LevelManagerService } from './level-manager.service';

describe('LevelManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelManagerService = TestBed.get(LevelManagerService);
    expect(service).toBeTruthy();
  });
});
