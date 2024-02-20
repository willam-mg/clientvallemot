import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRepuestoComponent } from './detalle-repuesto.component';

describe('DetalleRepuestoComponent', () => {
  let component: DetalleRepuestoComponent;
  let fixture: ComponentFixture<DetalleRepuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRepuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
