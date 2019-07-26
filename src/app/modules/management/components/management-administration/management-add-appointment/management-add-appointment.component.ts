import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Appointment } from 'src/app/shared/models/appointment.model';
import { Router } from '@angular/router';
import { UiService } from 'src/app/shared/services/ui.service';



@Component({
    selector: 'app-management-add-appointment',
    templateUrl: './management-add-appointment.component.html',
    styleUrls: ['./management-add-appointment.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class ManagementAddAppointmentComponent implements OnInit {

    selectedDoctor: Doctor;
    doctors: Observable<any>;
    startDate = new Date();
    minDate = new Date();
    date = new FormControl(this.startDate);
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    endTime: string;

    constructor(
        private adapter: DateAdapter<any>,
        private dbService: DatabaseService,
        private uiService: UiService
    ) {

    }

    ngOnInit() {
        this.adapter.setLocale('pl');
        this.doctors = this.dbService.getAllDoctors();
    }

    // TODO Add hours to date and then add minutes

    summarizeForm(f: NgForm) {
        const time: string[] = (f.value.startTime).split(':');
        const m = f.value.appointmentDate._i;
        const fullAppointmentDate = new Date(m.year, m.month, m.date, +time[0], +time[1]);
        const momentDate = moment(fullAppointmentDate).add(f.value.appointmentLength * f.value.numberOfAppointments, 'minutes');
        this.endTime = momentDate.format('HH:mm');
    }

    onSubmit(f: NgForm) {
        this.dbService.addFreeAppointments(this.addAppointments(f));
        f.resetForm();
        this.endTime = '';
        this.uiService.displaySnackbarNotification(`Added ${f.value.numberOfAppointments} to database`);
    }

    addAppointments(f: NgForm): Appointment[] {
        const appointmentArray: Appointment[] = [];

        for (let i = 0; i < f.value.numberOfAppointments; i++) {
            const time: string[] = (f.value.startTime).split(':');
            const m = f.value.appointmentDate._i;
            const fullAppointmentDate = new Date(m.year, m.month, m.date, +time[0], +time[1]);
            const start = moment(fullAppointmentDate).add(f.value.appointmentLength * i, 'minutes').format('HH:mm');

            appointmentArray.push({
                doctorUid: f.value.doctor,
                date: f.value.appointmentDate.toDate(),
                state: 'free',
                timeStart: start,
            });
        }

        return appointmentArray;
    }

}
