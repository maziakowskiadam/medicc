import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


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

    constructor(
        private _adapter: DateAdapter<any>,
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this._adapter.setLocale('pl');
    }

    onSubmit(form: NgForm) {
        this.authService.registerUser(
            { email: form.value.email, password: form.value.password }
        );
    }

    onCancel(form: NgForm) {
        // this.router.navigate(['/auth/login']);
        console.log(form.value.dateOfBirth._d);
    }
}
