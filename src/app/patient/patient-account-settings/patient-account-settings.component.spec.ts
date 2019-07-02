import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAccountSettingsComponent } from './patient-account-settings.component';

describe('PatientAccountSettingsComponent', () => {
  let component: PatientAccountSettingsComponent;
  let fixture: ComponentFixture<PatientAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
