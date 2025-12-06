import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCustomersComponent } from './buy-customers.component';

describe('BuyCustomersComponent', () => {
  let component: BuyCustomersComponent;
  let fixture: ComponentFixture<BuyCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
