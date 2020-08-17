import { TestBed } from '@angular/core/testing';

import { ProductworldformsService } from './productworldforms.service';

describe('ProductworldformsService', () => {
  let service: ProductworldformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductworldformsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
