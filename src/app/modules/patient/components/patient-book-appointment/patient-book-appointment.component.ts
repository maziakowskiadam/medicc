import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Appointment } from 'src/app/shared/models/appointment.model';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
    selector: 'app-patient-book-appointment',
    templateUrl: './patient-book-appointment.component.html',
    styleUrls: ['./patient-book-appointment.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class PatientBookAppointmentComponent implements OnInit {

    selectedSpecialization = 'żadna';
    selectedDoctor = 'żaden';
    selectedAppType = 'żaden';
    newAppointment: Appointment;

    constructor(
        private _adapter: DateAdapter<any>,
        private dbService: DatabaseService
    ) { }

    specializations: Specialization[] = [
        { name: 'internista' },
        { name: 'ortopeda' },
        { name: 'kardiolog' }
    ];

    doctors: Doctor[] = [
        { name: 'Jan Kowalski' },
        { name: 'Łukasz Wesołowski' },
        { name: 'Tomasz Królicki' }
    ];

    appointmentTypes: AppointmentType[] = [
        { name: 'Wizyta kotrolna' },
        { name: 'Operacja' },
        { name: 'Zabieg' }
    ];

    ngOnInit() {
        this._adapter.setLocale('pl');
    }

    onSubmit(form: NgForm) {
        const appointment: Appointment = {
            patient: form.value.patient,
            doctorUid: form.value.doctor,
            date: new Date(`${form.value.date.format('MM.DD.YYYY')} ${form.value.startTime}`),
            type: form.value.type
        };
        this.dbService.addAppointment(appointment);
        // console.log(form.value.date.format('DD.MM.YYYY'));
        // console.log(form.value.appointmentDate._d.getTime);
    }

}

export interface Specialization {
    name?: string;
}

export interface Doctor {
    name?: string;
}

export interface AppointmentType {
    name?: string;
}
