import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAddAppointmentComponent } from './management-add-appointment.component';

describe('ManagementAddAppointmentComponent', () => {
  let component: ManagementAddAppointmentComponent;
  let fixture: ComponentFixture<ManagementAddAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAddAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
