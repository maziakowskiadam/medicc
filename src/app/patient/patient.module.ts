import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PatientIndexComponent } from './patient-index/patient-index.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientBookAppointmentComponent } from './patient-book-appointment/patient-book-appointment.component';
import { PatientResultsComponent } from './patient-results/patient-results.component';
import { PatientAccountSettingsComponent } from './patient-account-settings/patient-account-settings.component';


@NgModule({
    declarations: [
        PatientIndexComponent,
        PatientBookAppointmentComponent,
        PatientResultsComponent,
        PatientAccountSettingsComponent,
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
