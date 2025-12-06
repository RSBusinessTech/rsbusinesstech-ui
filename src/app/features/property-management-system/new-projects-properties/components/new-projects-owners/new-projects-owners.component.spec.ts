import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectsOwnersComponent } from './new-projects-owners.component';

describe('NewProjectsOwnersComponent', () => {
  let component: NewProjectsOwnersComponent;
  let fixture: ComponentFixture<NewProjectsOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectsOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectsOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
