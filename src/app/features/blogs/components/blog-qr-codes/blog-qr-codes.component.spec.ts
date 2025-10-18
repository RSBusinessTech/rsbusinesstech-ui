import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogQrCodesComponent } from './blog-qr-codes.component';

describe('BlogQrCodesComponent', () => {
  let component: BlogQrCodesComponent;
  let fixture: ComponentFixture<BlogQrCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogQrCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogQrCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
