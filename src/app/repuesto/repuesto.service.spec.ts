import { TestBed } from '@angular/core/testing';

import { RepuestoService } from './repuesto.service';

describe('RepuestoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepuestoService = TestBed.get(RepuestoService);
    expect(service).toBeTruthy();
  });
});
