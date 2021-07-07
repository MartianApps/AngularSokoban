import { TestBed } from '@angular/core/testing';

import { CommandProcessorService } from './command-processor.service';

describe('CommandProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandProcessorService = TestBed.get(CommandProcessorService);
    expect(service).toBeTruthy();
  });
});
