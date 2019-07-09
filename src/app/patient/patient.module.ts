import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PatientIndexComponent } from './patient-index/patient-index.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientBookAppointmentComponent } from './patient-book-appointment/patient-book-appointment.component';
import { PatientAccountSettingsComponent } from './patient-account-settings/patient-account-settings.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';


@NgModule({
    declarations: [
        PatientIndexComponent,
        PatientBookAppointmentComponent,
        PatientAccountSettingsComponent,
        PatientHistoryComponent
    ],
    imports: [
        PatientRoutingModule,
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule
    ],
    exports: []
})
export class PatientModule { }
