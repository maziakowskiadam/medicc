import { User } from '../../auth/models/user.model';
import { AuthData } from '../../auth/models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppointmentService } from './appointment.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class AuthService {

    authStatus = new Subject<boolean>();
    private isAuthenticated = false;


    constructor(
        private router: Router,
        private _snackBar: MatSnackBar,
        private afAuth: AngularFireAuth,
        private appService: AppointmentService,
        private afs: AngularFirestore
    ) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(
            user => {
                if (user) {
                    this.isAuthenticated = true;
                    this.authStatus.next(true);
                    this._snackBar.open('Zalogowano pomyślnie', 'OK', { duration: 3000 });
                    this.router.navigate(['/patient/index']);
                } else {
                    this.appService.cancelSubs();
                    this.isAuthenticated = false;
                    this.authStatus.next(false);
                    this._snackBar.open('Wylogowano', 'OK', { duration: 3000 });
                    this.router.navigate(['/']);
                }
            }
        );
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {

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
            }).catch(error => {
                console.error(error);
            });
    }


    logout() {
        this.afAuth.auth.signOut();

    }


    isAuth() {
        return this.isAuthenticated;
        // return this.afAuth.authState
    }


}
