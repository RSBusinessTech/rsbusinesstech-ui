import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDashboardComponent } from './buy-dashboard.component';

describe('BuyDashboardComponent', () => {
  let component: BuyDashboardComponent;
  let fixture: ComponentFixture<BuyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
