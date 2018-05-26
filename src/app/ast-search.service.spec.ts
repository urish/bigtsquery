import { TestBed, inject } from '@angular/core/testing';

import { AstSearchService } from './ast-search.service';

describe('AstSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AstSearchService],
    });
  });

  it(
    'should be created',
    inject([AstSearchService], (service: AstSearchService) => {
      expect(service).toBeTruthy();
    }),
  );
});
