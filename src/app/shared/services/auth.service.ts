import { User } from '../../auth/models/user.model';
import { AuthData } from '../../auth/models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class AuthService {

    authStatus = new Subject<boolean>();
    private user: User;

    constructor(
        private router: Router,
        private _snackBar: MatSnackBar
    ) { }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: `${Math.round(Math.random() * 1000000)}`
        };
        this.authSuccess();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: `${Math.round(Math.random() * 1000000)}`
        };
        this.authSuccess();
    }

    logout() {
        this.user = null;
        this.authStatus.next(false);
        this._snackBar.open('Wylogowano', 'OK', { duration: 3000 });
        this.router.navigate(['/auth/login']);
    }

    getUser() {
        return { ... this.user };
    }

    isAuth() {
        return this.user != null;
    }

    authSuccess() {
        this._snackBar.open('Zalogowano pomyślnie', 'OK', { duration: 3000 });
        this.authStatus.next(true);
        this.router.navigate(['/patient/index']);
    }


}
