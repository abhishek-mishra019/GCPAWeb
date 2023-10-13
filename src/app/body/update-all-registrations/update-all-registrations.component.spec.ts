import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAllRegistrationsComponent } from './update-all-registrations.component';

describe('UpdateAllRegistrationsComponent', () => {
  let component: UpdateAllRegistrationsComponent;
  let fixture: ComponentFixture<UpdateAllRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAllRegistrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAllRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
