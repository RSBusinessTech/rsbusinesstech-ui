import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mm2hCustomersComponent } from './mm2h-customers.component';

describe('Mm2hCustomersComponent', () => {
  let component: Mm2hCustomersComponent;
  let fixture: ComponentFixture<Mm2hCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mm2hCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mm2hCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
