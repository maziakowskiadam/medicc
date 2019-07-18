import { User } from '../../auth/models/user.model';
import { AuthData } from '../../auth/models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppointmentService } from './appointment.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from './ui.service';


@Injectable()
export class AuthService {

    authStatus = new Subject<boolean>();
    private isAuthenticated = false;


    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private appService: AppointmentService,
        private uiService: UiService,
        private afs: AngularFirestore
    ) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(
            user => {
                if (user) {
                    this.isAuthenticated = true;
                    this.authStatus.next(true);
                    this.uiService.displaySnackbarNotification('Zalogowano');
                    this.router.navigate(['/patient/index']);
                } else {
                    this.appService.cancelSubs();
                    this.isAuthenticated = false;
                    this.authStatus.next(false);
                    this.uiService.displaySnackbarNotification('Wylogowano');
                    this.router.navigate(['/']);
                }
            }
        );
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
                console.log('Zarejestrowano pacjenta');
                this.registerPatientInDatabase(result.user.email, result.user.uid);
            }).catch(error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.displaySnackbarNotification(error.message);
            });
    }


    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
                console.log('zalogowano');
            }).catch(error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.displaySnackbarNotification(error.message);
            });
    }


    logout() {
        this.afAuth.auth.signOut();
    }


    isAuth() {
        return this.isAuthenticated;
    }

    registerPatientInDatabase(email: string, uid: string) {
        this.afs.collection('users').doc(uid).set({
            email,
            uid,
            roles: {
                management: false,
                doctor: false,
                patient: true,
                patientUnauthorized: true
            }
        });
    }
}
