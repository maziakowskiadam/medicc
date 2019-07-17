import { User } from '../../auth/models/user.model';
import { AuthData } from '../../auth/models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppointmentService } from './appointment.service';


@Injectable()
export class AuthService {

    authStatus = new Subject<boolean>();
    private isAuthenticated = false;


    constructor(
        private router: Router,
        private _snackBar: MatSnackBar,
        private afAuth: AngularFireAuth,
        private appService: AppointmentService
    ) { }


    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                // console.log('zarejestrowano')
                // console.log(result);
                this.authSuccessfully();

            }).catch(error => {
                console.error(error);
            });
    }


    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                console.log('zalogowano');
                console.log(result);
                this.authSuccessfully();

            }).catch(error => {
                console.error(error);
            });
    }


    logout() {
        this.appService.cancelSubs();
        this.afAuth.auth.signOut();
        this.isAuthenticated = false;
        this.authStatus.next(false);
        this._snackBar.open('Wylogowano', 'OK', { duration: 3000 });
        this.router.navigate(['/auth/login']);
    }


    isAuth() {
        return this.isAuthenticated;
        // return this.afAuth.authState
    }


    authSuccessfully() {
        this.isAuthenticated = true;
        this._snackBar.open('Zalogowano pomyślnie', 'OK', { duration: 3000 });
        this.authStatus.next(true);
        this.router.navigate(['/patient/index']);
    }


}
