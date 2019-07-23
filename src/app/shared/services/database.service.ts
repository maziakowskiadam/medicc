import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Appointment } from '../models/appointment.model';
import { Subject, Subscription, Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { Patient } from '../models/patient.model';
import { User } from '../models/user.model';

@Injectable()
export class DatabaseService {


    // Init

    appointments: Appointment[] = [];
    unauthPatientUsers: User[] = [];
    appointmentsChanged = new Subject<Appointment[]>();
    unauthorizedPatientUsersChanged = new Subject<User[]>();
    firebaseSubs: Subscription[] = [];

    constructor(
        private afs: AngularFirestore,
    ) { }


    // Patients

    getUnauthorizedPatientUsers() {
        this.firebaseSubs.push(this.afs.collection('users')
            .snapshotChanges()
            .pipe(
                map(documentArray => {
                    return documentArray.map(doc => {
                        return {
                            ...doc.payload.doc.data()
                        };
                    });
                }))
            .subscribe((users: User[]) => {
                this.unauthPatientUsers = users;
                this.unauthorizedPatientUsersChanged.next([...this.unauthPatientUsers]);
            }));
    }

    // getUnauthorizedPatients() {
    //     let array = [];
    //     this.afs.collection('users').valueChanges()
    //         .subscribe(r => {
    //             array = r.filter((a: User) => a.roles.patientUnauthorized);
    //             this.unauthorizedPatients.next([...array]);
    //         });
    // }

    addPatientUnauthorizedAsUser(email: string, uid: string) {
        this.afs.collection('users').doc(uid).set({
            email,
            uid,
            roles: {
                management: false,
                doctor: false,
                patient: false,
                patientUnauthorized: true
            }
        });
    }

    addPatientAsUser(email: string, uid: string) {
        this.afs.collection('users').doc(uid).set({
            email,
            uid,
            roles: {
                management: false,
                doctor: false,
                patient: true,
                patientUnauthorized: false
            }
        });
    }

    addPatientToDb(uid: string, data: Patient) {
        this.afs.collection('patients').add({
            UUID: uid,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            pesel: data.pesel,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
        });
    }


    // Appointments

    addAppointment(appointment: Appointment) {
        this.addDataToDatabase(appointment);
    }

    fetchAllAppointments() {
        this.firebaseSubs.push(this.afs.collection('appointments')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                        };
                    });
                }))
            .subscribe((appointments: Appointment[]) => {
                this.appointments = appointments;
                this.appointmentsChanged.next([...this.appointments]);
            }));
    }


    // Doctors

    getAllDoctors() {
        const doctors: Observable<Doctor[]> = this.afs.collection('doctors')
            .valueChanges();

        return doctors;
    }

    addDoctorAsUser(email: string, uid: string) {
        this.afs.collection('users').doc(uid).set({
            email,
            uid,
            roles: {
                management: false,
                doctor: true,
                patient: false,
                patientUnauthorized: false
            }
        });
    }

    addDoctorToDb(uid: string, data: Doctor) {
        this.afs.collection('doctors').add({
            UUID: uid,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            specialization: data.specialization
        });
    }


    // Others

    cancelSubs() {
        if (this.firebaseSubs) {
            this.firebaseSubs.forEach(element => {
                element.unsubscribe();
            });
        }
    }

    private addDataToDatabase(appointment: Appointment) {
        this.afs.collection('appointments').add(appointment);
    }
}
