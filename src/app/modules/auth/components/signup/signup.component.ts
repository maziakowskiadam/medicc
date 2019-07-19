import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/services/ui.service';


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
export class SignupComponent implements OnInit, OnDestroy {

    email = new FormControl('', [Validators.required, Validators.email]);
    genderPosition = 'M';
    formFilled = true;
    isHandset = false;
    isLoading = false;
    loadingSubscription: Subscription;
    startDate = new Date(1995, 11, 8);
    date = new FormControl(this.startDate);

    constructor(
        private adapter: DateAdapter<any>,
        private authService: AuthService,
        private uiService: UiService,
        private router: Router) {
    }

    ngOnInit() {
        this.adapter.setLocale('pl');
        this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
        console.log(this.startDate.toISOString());
    }

    onSubmit(form: NgForm) {
        this.authService.registerPatientUnauthorized(
            { email: form.value.email, password: form.value.password }
        );
    }

    onCancel(form: NgForm) {
        // this.router.navigate(['/auth/login']);
        // console.log(form.value.dateOfBirth._d);
        form.resetForm();
    }

    ngOnDestroy(): void {
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }
}
