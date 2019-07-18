import { Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';
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

    private isAuthenticated = false;
    authStatus = new Subject<boolean>();
    role = new BehaviorSubject<string>('NONE');
    authSubs: Subscription[] = [];


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
                    this.checkRoleAndNavigate(user.uid);
                } else {
                    this.isAuthenticated = false;
                    this.authStatus.next(false);
                    this.uiService.displaySnackbarNotification('Proszę się zalogować');
                    this.router.navigate(['/']);
                    console.log(this.role.value);
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
                this.checkRoleAndNavigate(result.user.uid);
            }).catch(error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.displaySnackbarNotification(error.message);
            });
    }


    logout() {
        this.afAuth.auth.signOut();
        this.cancelAuthSubs();
        this.role.next('NONE');
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

    checkRoleAndNavigate(uid: string) {
        this.authSubs.push(this.afs.collection('users').doc(uid).valueChanges().subscribe((u: User) => {
            if (u.roles.management) {
                this.role.next('MANAGEMENT');
                this.router.navigate(['management/index']);
            } else if (u.roles.patient) {
                this.role.next('PATIENT');
                this.router.navigate(['patient/index']);
            } else if (u.roles.doctor) {
                this.role.next('DOCTOR');
                this.router.navigate(['doctor/index']);
            }
        }, error => {
            console.error(error);
        }
        ));
    }

    isManagement(uid: string) {
        this.afs.collection('users').doc(uid).valueChanges()
            .subscribe(
                (u: User) => {
                    if (u.roles.management) { return true; }
                });
    }

    isPatient(uid: string) {
        this.afs.collection('users').doc(uid).valueChanges()
            .subscribe(
                (u: User) => {
                    if (u.roles.patient) { return true; }
                });
    }

    cancelAuthSubs() {
        this.authSubs.forEach(sub => {
            sub.unsubscribe();
        });
    }

}

