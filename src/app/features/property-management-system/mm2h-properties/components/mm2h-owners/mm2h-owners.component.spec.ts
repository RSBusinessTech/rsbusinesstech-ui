import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mm2hOwnersComponent } from './mm2h-owners.component';

describe('Mm2hOwnersComponent', () => {
  let component: Mm2hOwnersComponent;
  let fixture: ComponentFixture<Mm2hOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mm2hOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mm2hOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
