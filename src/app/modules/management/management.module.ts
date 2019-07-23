import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { ManagementRoutingModule } from './management-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementPatientsComponent } from './components/management-patients/management-patients.component';
import { ManagementDoctorsComponent } from './components/management-doctors/management-doctors.component';
import { ManagementAdministrationComponent } from './components/management-administration/management-administration.component';
import { ManagementAddDoctorComponent } from './components/management-doctors/management-add-doctor/management-add-doctor.component';
import { ManagementAddAppointmentComponent } from './components/management-administration/management-add-appointment/management-add-appointment.component';
import { ManagementAddPatientComponent } from './components/management-patients/management-add-patient/management-add-patient.component';
import { ManagementConfirmPatientComponent } from './components/management-patients/management-confirm-patient/management-confirm-patient.component';

@NgModule({
    declarations: [
        ManagementIndexComponent,
        ManagementPatientsComponent,
        ManagementDoctorsComponent,
        ManagementAdministrationComponent,
        ManagementAddDoctorComponent,
        ManagementAddAppointmentComponent,
        ManagementAddPatientComponent,
        ManagementConfirmPatientComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        ManagementRoutingModule,
    ]
})
export class ManagementModule { }
