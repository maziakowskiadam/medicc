import { Subject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/modules/auth/models/user.model';
import { AuthData } from 'src/app/modules/auth/models/auth-data.model';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';


@Injectable()
export class AuthService {

    authStatus = new Subject<boolean>();
    isAuthenticated = false;
    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private _snackBar: MatSnackBar,
        private router: Router) {

        this.user$ = this.afAuth.authState
            .pipe(switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            }));
    }

    // Registering Patient into users database

    registerPatientUnauthorized(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this._snackBar.open('Zarejestrowano', 'OK', { duration: 2000 });
                this.addPatientUnauthorizedToDatabase(authData.email, result.user.uid);
            })
            .catch(error => {
                console.log(error);
                this._snackBar.open('Jakiś błąd', 'OK', { duration: 2000 });
            });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                console.log('Zalogowano');
                this.authSuccess();
            })
            .catch(error => {
                console.error(error);
                this._snackBar.open('Jakiś błąd', 'OK', { duration: 2000 });
            });
    }

    logout() {
        this.afAuth.auth.signOut();
        this.isAuthenticated = false;
        this.authStatus.next(false);
        this._snackBar.open('Wylogowano', 'OK', { duration: 3000 });
        this.router.navigate(['/auth/login']);
    }


    isAuth() {
        return this.isAuthenticated;
    }

    authSuccess() {
        this.isAuthenticated = true;
        this.authStatus.next(true);
        this.router.navigate(['/patient/index']);
    }

    addPatientUnauthorizedToDatabase(email: string, uid: string) {
        this.afs.collection('users').doc(`${uid}`).set(
            {
                uid,
                email,
                roles: {
                    doctor: false,
                    management: false,
                    patient: true,
                    patientUnauthorized: true
                }
            }
        );
        console.log('Pacjent dodany');
    }

}
