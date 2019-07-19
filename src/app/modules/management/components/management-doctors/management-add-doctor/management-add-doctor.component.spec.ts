import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAddDoctorComponent } from './management-add-doctor.component';

describe('ManagementAddDoctorComponent', () => {
  let component: ManagementAddDoctorComponent;
  let fixture: ComponentFixture<ManagementAddDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAddDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAddDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
