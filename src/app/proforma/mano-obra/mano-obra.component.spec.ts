import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManoObraComponent } from './mano-obra.component';

describe('ManoObraComponent', () => {
  let component: ManoObraComponent;
  let fixture: ComponentFixture<ManoObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManoObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManoObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
