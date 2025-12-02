import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalCustomersComponent } from './rental-customers.component';

describe('RentalCustomersComponent', () => {
  let component: RentalCustomersComponent;
  let fixture: ComponentFixture<RentalCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
