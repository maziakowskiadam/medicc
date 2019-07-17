import { User } from '../../auth/models/user.model';
import { AuthData } from '../../auth/models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class AuthService {

    authStatus = new Subject<boolean>();
    private user: User;

    constructor(
        private router: Router,
        // tslint:disable-next-line: variable-name
        private _snackBar: MatSnackBar,
        private afAuth: AngularFireAuth,
        private db: AngularFirestore
    ) { }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this._snackBar.open('Zarejestrowano', 'OK', { duration: 2000 });
                this.addPatientUnauthorizedToDatabase(authData.email);
            })
            .catch(error => {
                console.log(error);
                this._snackBar.open('Jakiś błąd', 'OK', { duration: 2000 });
            });




    }

    login(authData: AuthData) {

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
        // this.router.navigate(['/patient/index']);
    }




    addPatientUnauthorizedToDatabase(emailAddress: string) {
        this.db.collection('users').add(
            {
                email: emailAddress,
                roles: {
                    doctor: false,
                    management: false,
                    patient: false,
                    patientUnauthorized: true
                }
            }
        );
        console.log('Pacjent dodany');
    }

}
