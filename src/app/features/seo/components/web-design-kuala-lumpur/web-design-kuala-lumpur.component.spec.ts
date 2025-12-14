import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDesignKualaLumpurComponent } from './web-design-kuala-lumpur.component';

describe('WebDesignKualaLumpurComponent', () => {
  let component: WebDesignKualaLumpurComponent;
  let fixture: ComponentFixture<WebDesignKualaLumpurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDesignKualaLumpurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDesignKualaLumpurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
