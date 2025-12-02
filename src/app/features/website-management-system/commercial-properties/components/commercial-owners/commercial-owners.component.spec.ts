import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialOwnersComponent } from './commercial-owners.component';

describe('CommercialOwnersComponent', () => {
  let component: CommercialOwnersComponent;
  let fixture: ComponentFixture<CommercialOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
