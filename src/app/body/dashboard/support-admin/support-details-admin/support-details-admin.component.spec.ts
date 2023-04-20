import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDetailsAdminComponent } from './support-details-admin.component';

describe('SupportDetailsAdminComponent', () => {
  let component: SupportDetailsAdminComponent;
  let fixture: ComponentFixture<SupportDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportDetailsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
