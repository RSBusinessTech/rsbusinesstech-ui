import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnerDashboardComponent } from './view-owner-dashboard.component';

describe('ViewOwnerDashboardComponent', () => {
  let component: ViewOwnerDashboardComponent;
  let fixture: ComponentFixture<ViewOwnerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwnerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
