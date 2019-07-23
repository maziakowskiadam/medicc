import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementConfirmPatientComponent } from './management-confirm-patient.component';

describe('ManagementConfirmPatientComponent', () => {
  let component: ManagementConfirmPatientComponent;
  let fixture: ComponentFixture<ManagementConfirmPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementConfirmPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementConfirmPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
