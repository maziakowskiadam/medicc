import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from './ui.service';
import { DatabaseService } from './database.service';
import { AuthData } from 'src/app/modules/auth/models/auth-data.model';
import { User } from '../models/user.model';


@Injectable()
export class AuthService {

    authStatus = new Subject<boolean>();
    private isAuthenticated = false;
    private isManag = false;
    private isPat = false;


    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private dbService: DatabaseService,
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
                    // this.router.navigate(['/patient/index']);
                } else {
                    this.dbService.cancelSubs();
                    this.isAuthenticated = false;
                    this.authStatus.next(false);
                    // this.router.navigate(['/']);
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
                this.registerPatientInDatabase(result.user.email, result.user.uid);
                console.log('Zarejestrowano pacjenta');
                this.router.navigate(['patient/index']);
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
                this.router.navigate(['patient/index']);
            }).catch(error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.displaySnackbarNotification(error.message);
            });
    }


    logout() {
        this.afAuth.auth.signOut();
        this.uiService.displaySnackbarNotification('Wylogowano');
        this.router.navigate(['/']);
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

    isManagement() {

        if (this.afAuth.user) {
            this.afAuth.user.subscribe(u => {
                this.afs.collection('users')
                    .doc(u.uid)
                    .valueChanges()
                    .subscribe((result: User) => {
                        if (result.roles.management) {
                            this.isManag = true;
                        } else { return false; }
                    }, error => { });
            });
            return this.isManag;
        } else { return this.isManag = false; }

    }

    isPatient() {
        if (this.afAuth.user) {
            this.afAuth.user.subscribe(u => {
                this.afs.collection('users')
                    .doc(u.uid)
                    .valueChanges()
                    .subscribe((result: User) => {
                        if (result.roles.patient) {
                            this.isPat = true;
                        } else { return false; }
                    }, error => { });
            });
            return this.isPat;
        } else { return this.isPat; }
    }

    navigateToRole() {
        if (this.isManag) {
            this.router.navigate(['management/index']);
        } else if (this.isPat) {
            this.router.navigate(['patient/index']);
        }
    }

    checkRole() {

    }


}
