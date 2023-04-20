import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDataTableComponent } from './support-data-table.component';

describe('SupportDataTableComponent', () => {
  let component: SupportDataTableComponent;
  let fixture: ComponentFixture<SupportDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
