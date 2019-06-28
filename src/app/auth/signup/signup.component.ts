import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';


const moment = _moment;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [

        { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },


        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class SignupComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    genderPosition = 'M';
    formFilled = true;
    isHandset = false;

    constructor(private _adapter: DateAdapter<any>) {
        this._adapter.setLocale('pl');
    }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        const momentDateObject = form.value.dateOfBirth._i;
        const dateString = `${momentDateObject.date}.${momentDateObject.month}.${momentDateObject.year}`;
        console.log(dateString);
    }

    onCancel() {
        console.log('cancelled')
    }
}
