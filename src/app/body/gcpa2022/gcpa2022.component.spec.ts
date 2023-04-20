import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GCPA2022Component } from './gcpa2022.component';

describe('GCPA2022Component', () => {
  let component: GCPA2022Component;
  let fixture: ComponentFixture<GCPA2022Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GCPA2022Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GCPA2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
