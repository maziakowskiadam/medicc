import { Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';

import { UiService } from './ui.service';
import { DatabaseService } from './database.service';
import { AuthData } from 'src/app/modules/auth/models/auth-data.model';
import { User } from '../models/user.model';
import * as fromAppReducer from '../store/reducers/app.reducer';
import * as UI from '../store/actions/ui.actions';
import { Doctor } from '../models/doctor.model';
import { Patient } from '../models/patient.model';


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
        private afs: AngularFirestore,
        private store: Store<fromAppReducer.State>,
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

    registerPatientUnauthorized(authData: AuthData) {

        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                this.dbService.addPatientUnauthorizedAsUser(result.user.email, result.user.uid);
            }).catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.displaySnackbarNotification(error.message);
            });
    }

    registerNewDoctor(authData: AuthData, data: Doctor) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                this.dbService.addDoctorAsUser(result.user.email, result.user.uid);
                this.dbService.addDoctorToDb(result.user.uid, data);
            }).catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.displaySnackbarNotification(error.message);
            });
    }

    registerNewPatient(authData: AuthData, data: Patient) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                this.dbService.addPatientAsUser(result.user.email, result.user.uid);
                this.dbService.addPatientToDb(result.user.uid, data);
            }).catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.displaySnackbarNotification(error.message);
            });
    }


    login(authData: AuthData) {

        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                this.checkRoleAndNavigate(result.user.uid);
            }).catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.displaySnackbarNotification(error.message);
            });
    }


    logout() {
        this.afAuth.auth.signOut();
        this.role.next('NONE');
        this.cancelAuthSubs();
        this.dbService.cancelSubs();
        this.router.navigate(['/']);
        this.uiService.displaySnackbarNotification('Wylogowano');
    }

    isAuth() {
        return this.isAuthenticated;
    }

    checkRoleAndNavigate(uid: string) {
        this.authSubs.push(this.afs.collection('users').doc(uid).valueChanges().subscribe((u: User) => {
            if (u.roles.management) {
                this.role.next('MANAGEMENT');
                this.router.navigate(['management/index']);
                console.log(this.role.value, uid);
            } else if (u.roles.patient) {
                this.role.next('PATIENT');
                this.router.navigate(['patient/index']);
                console.log(this.role.value, uid);
            } else if (u.roles.doctor) {
                this.role.next('DOCTOR');
                this.router.navigate(['doctor/index']);
                console.log(this.role.value, uid);
            } else if (u.roles.patientUnauthorized) {
                this.role.next('PATIENT_UNAUTHORIZED');
                this.router.navigate(['/']);
                console.log(this.role.value, uid);
            }
        }, error => {
            console.log(error);
        }
        ));
    }

    cancelAuthSubs() {
        if (this.authSubs) {
            this.authSubs.forEach(sub => {
                sub.unsubscribe();
            });
        }
    }

}

