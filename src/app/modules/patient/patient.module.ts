import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientIndexComponent } from './components/patient-index/patient-index.component';
import { PatientBookAppointmentComponent } from './components/patient-book-appointment/patient-book-appointment.component';
import { PatientAccountSettingsComponent } from './components/patient-account-settings/patient-account-settings.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        PatientIndexComponent,
        PatientBookAppointmentComponent,
        PatientAccountSettingsComponent,
        PatientHistoryComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        PatientRoutingModule,
    ],
    exports: []
})
export class PatientModule { }
