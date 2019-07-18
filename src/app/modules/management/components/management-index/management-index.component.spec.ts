import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementIndexComponent } from './management-index.component';

describe('ManagementIndexComponent', () => {
  let component: ManagementIndexComponent;
  let fixture: ComponentFixture<ManagementIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
