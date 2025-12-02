import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOwnersComponent } from './buy-owners.component';

describe('BuyOwnersComponent', () => {
  let component: BuyOwnersComponent;
  let fixture: ComponentFixture<BuyOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
