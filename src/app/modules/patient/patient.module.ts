import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PatientRoutingModule } from './patient-routing.module';
import { FormsModule } from '@angular/forms';
import { PatientIndexComponent } from './components/patient-index/patient-index.component';
import { PatientBookAppointmentComponent } from './components/patient-book-appointment/patient-book-appointment.component';
import { PatientAccountSettingsComponent } from './components/patient-account-settings/patient-account-settings.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
    declarations: [
        PatientIndexComponent,
        PatientBookAppointmentComponent,
        PatientAccountSettingsComponent,
        PatientHistoryComponent,
    ],
    imports: [
        PatientRoutingModule,
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        FormsModule
    ],
    exports: []
})
export class PatientModule { }
