import { TestBed } from '@angular/core/testing';

import { EfService } from './ef.service';

describe('EfService', () => {
  let service: EfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
