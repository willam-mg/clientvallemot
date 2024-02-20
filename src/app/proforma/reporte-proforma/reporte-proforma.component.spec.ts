import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteProformaComponent } from './reporte-proforma.component';

describe('ReporteProformaComponent', () => {
  let component: ReporteProformaComponent;
  let fixture: ComponentFixture<ReporteProformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteProformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
