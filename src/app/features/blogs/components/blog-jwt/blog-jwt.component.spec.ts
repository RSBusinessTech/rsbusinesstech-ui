import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogJwtComponent } from './blog-jwt.component';

describe('BlogJwtComponent', () => {
  let component: BlogJwtComponent;
  let fixture: ComponentFixture<BlogJwtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogJwtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
