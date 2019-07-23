import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAddPatientComponent } from './management-add-patient.component';

describe('ManagementAddPatientComponent', () => {
  let component: ManagementAddPatientComponent;
  let fixture: ComponentFixture<ManagementAddPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAddPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAddPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
