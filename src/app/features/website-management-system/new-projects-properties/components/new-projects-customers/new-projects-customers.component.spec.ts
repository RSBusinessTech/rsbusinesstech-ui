import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectsCustomersComponent } from './new-projects-customers.component';

describe('NewProjectsCustomersComponent', () => {
  let component: NewProjectsCustomersComponent;
  let fixture: ComponentFixture<NewProjectsCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectsCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectsCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
