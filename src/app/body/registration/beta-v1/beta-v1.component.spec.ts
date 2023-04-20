import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaV1Component } from './beta-v1.component';

describe('BetaV1Component', () => {
  let component: BetaV1Component;
  let fixture: ComponentFixture<BetaV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetaV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
