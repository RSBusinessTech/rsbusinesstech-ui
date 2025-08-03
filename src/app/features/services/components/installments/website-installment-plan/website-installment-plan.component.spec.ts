import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteInstallmentPlanComponent } from './website-installment-plan.component';

describe('WebsiteInstallmentPlanComponent', () => {
  let component: WebsiteInstallmentPlanComponent;
  let fixture: ComponentFixture<WebsiteInstallmentPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteInstallmentPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteInstallmentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
