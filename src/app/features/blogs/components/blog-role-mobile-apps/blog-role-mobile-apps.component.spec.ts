import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRoleMobileAppsComponent } from './blog-role-mobile-apps.component';

describe('BlogRoleMobileAppsComponent', () => {
  let component: BlogRoleMobileAppsComponent;
  let fixture: ComponentFixture<BlogRoleMobileAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogRoleMobileAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogRoleMobileAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
