import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import * as _moment from 'moment';


@Component({
    selector: 'app-management-add-patient',
    templateUrl: './management-add-patient.component.html',
    styleUrls: ['./management-add-patient.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class ManagementAddPatientComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    genderPosition = 'M';
    startDate = new Date(1995, 11, 8);
    date = new FormControl(this.startDate);


    constructor(
        private adapter: DateAdapter<any>,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.adapter.setLocale('pl');

    }

    onSubmit(f: NgForm) {
        // console.log(f.value);
        // console.log(f.value.dateOfBirth._d);
        this.authService.registerNewPatient(
            {
                email: f.value.email,
                password: f.value.password
            },
            {
                email: f.value.email,
                firstName: f.value.firstName,
                lastName: f.value.lastName,
                pesel: f.value.pesel,
                dateOfBirth: f.value.dateOfBirth._d,
                gender: f.value.gender
            }
        );
        f.resetForm();
    }
}
