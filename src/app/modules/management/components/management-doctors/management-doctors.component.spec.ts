import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDoctorsComponent } from './management-doctors.component';

describe('ManagementDoctorsComponent', () => {
  let component: ManagementDoctorsComponent;
  let fixture: ComponentFixture<ManagementDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
