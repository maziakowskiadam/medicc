import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, Form, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    // email = new FormControl('', [Validators.required, Validators.email]);
    // password = new FormControl('', [Validators.required]);

    constructor(
        private authService: AuthService,
        private _snackBar: MatSnackBar) { }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        this.authService.login({ email: form.value.email, password: form.value.password });
        this.openSnackBar();
    }

    openSnackBar() {
        this._snackBar.open('Zalogowano pomyślnie', 'OK', { duration: 3000 });
    }
}
