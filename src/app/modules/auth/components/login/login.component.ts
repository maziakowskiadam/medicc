import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UiService } from 'src/app/shared/services/ui.service';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as fromAppReducer from '../../../../shared/store/reducers/app.reducer';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isLoading$: Observable<boolean>;
    loadingSubscription: Subscription;


    constructor(
        private authService: AuthService,
        private uiService: UiService,
        private store: Store<fromAppReducer.State>
    ) { }

    ngOnInit() {
        this.isLoading$ = this.store.select(fromAppReducer.getIsLoading);

        // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
        //     this.isLoading = isLoading;
        // });
    }

    onSubmit(form: NgForm) {
        this.authService.login({ email: form.value.email, password: form.value.password });
    }

}
