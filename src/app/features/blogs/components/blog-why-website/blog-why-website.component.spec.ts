import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogWhyWebsiteComponent } from './blog-why-website.component';

describe('BlogWhyWebsiteComponent', () => {
  let component: BlogWhyWebsiteComponent;
  let fixture: ComponentFixture<BlogWhyWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogWhyWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogWhyWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
