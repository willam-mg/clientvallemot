import { TestBed } from '@angular/core/testing';

import { AccesorioService } from './accesorio.service';

describe('AccesorioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesorioService = TestBed.get(AccesorioService);
    expect(service).toBeTruthy();
  });
});
