import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { UiService } from 'src/app/shared/services/ui.service';
import * as fromAppReducer from '../../../../shared/store/reducers/app.reducer';
import * as _moment from 'moment';
import { Store } from '@ngrx/store';



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
    isLoading$: Observable<boolean>;


    constructor(
        private adapter: DateAdapter<any>,
        private authService: AuthService,
        private uiService: UiService,
        private router: Router,
        private store: Store<fromAppReducer.State>
    ) {
    }

    ngOnInit() {
        this.adapter.setLocale('pl');
        this.isLoading$ = this.store.select(fromAppReducer.getIsLoading);
    }

    onSubmit(f: NgForm) {
        this.authService.registerPatientUnauthorized(
            { email: f.value.email, password: f.value.password },
            {
                email: f.value.email,
                firstName: f.value.firstName,
                lastName: f.value.lastName,
                pesel: f.value.pesel,
                dateOfBirth: f.value.dateOfBirth._d,
                gender: f.value.gender
            }

        );
    }

    onCancel(form: NgForm) {
        this.router.navigate(['/auth/login']);
    }

    ngOnDestroy(): void {
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }
}
