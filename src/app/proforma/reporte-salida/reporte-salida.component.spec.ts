import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSalidaComponent } from './reporte-salida.component';

describe('ReporteSalidaComponent', () => {
  let component: ReporteSalidaComponent;
  let fixture: ComponentFixture<ReporteSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
