import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, Form, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../shared/services/auth.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    isLoading = false;
    loadingSubscription: Subscription;


    constructor(
        private authService: AuthService,
        private uiService: UiService) { }

    ngOnInit() {
        this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
    }

    onSubmit(form: NgForm) {
        this.authService.login({ email: form.value.email, password: form.value.password });
    }

    ngOnDestroy(): void {
        this.loadingSubscription.unsubscribe();
    }

}
