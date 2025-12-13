import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerDashboardComponent } from './view-customer-dashboard.component';

describe('ViewCustomerDashboardComponent', () => {
  let component: ViewCustomerDashboardComponent;
  let fixture: ComponentFixture<ViewCustomerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCustomerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
