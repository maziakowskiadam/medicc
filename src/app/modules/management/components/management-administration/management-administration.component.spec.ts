import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAdministrationComponent } from './management-administration.component';

describe('ManagementAdministrationComponent', () => {
  let component: ManagementAdministrationComponent;
  let fixture: ComponentFixture<ManagementAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
