import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mm2hDashboardComponent } from './mm2h-dashboard.component';

describe('Mm2hDashboardComponent', () => {
  let component: Mm2hDashboardComponent;
  let fixture: ComponentFixture<Mm2hDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mm2hDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mm2hDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
