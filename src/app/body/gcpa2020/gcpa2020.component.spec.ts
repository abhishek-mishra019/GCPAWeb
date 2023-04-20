import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCPA2020Component } from './gcpa2020.component';

describe('GCPA2020Component', () => {
  let component: GCPA2020Component;
  let fixture: ComponentFixture<GCPA2020Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GCPA2020Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCPA2020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
