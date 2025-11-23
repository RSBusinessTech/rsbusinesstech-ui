import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectsDashboardComponent } from './new-projects-dashboard.component';

describe('NewProjectsDashboardComponent', () => {
  let component: NewProjectsDashboardComponent;
  let fixture: ComponentFixture<NewProjectsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
