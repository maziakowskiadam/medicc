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
    unauthPatients: User[] = [];
    appointmentsChanged = new Subject<Appointment[]>();
    unauthorizedPatientChanged = new Subject<User[]>();
    firebaseSubs: Subscription[] = [];

    constructor(
        private afs: AngularFirestore,
    ) { }


    // Patients

    authorizePatient(uid: string) {
        this.afs.collection('users')
            .doc(uid)
            .update(
                {
                    roles: {
                        patient: true,
                        patientUnauthorized: false
                    }
                });

        this.firebaseSubs.push(
            this.afs.collection('unauthorizedPatients', ref => ref.where('UUID', '==', uid))
                .get()
                .subscribe(snapshot => {
                    snapshot.forEach(doc => {
                        this.afs.collection('patients').add(doc.data());
                        doc.ref.delete();
                    });
                }));
    }

    getUnauthorizedPatients() {
        this.firebaseSubs.push(this.afs.collection('unauthorizedPatients')
            .valueChanges()
            .subscribe((r: User[]) => {
                this.unauthPatients = r;
                this.unauthorizedPatientChanged.next([...this.unauthPatients]);
            }));
    }

    addPatientUnauthorizedAsUser(email: string, uid: string) {
        this.afs.collection('users').doc(uid).set({
            email,
            uid,
            roles: {
                patient: false,
                patientUnauthorized: true
            }
        });
    }

    addPatientUnauthorizedToDb(uid: string, data: Patient) {
        this.afs.collection('unauthorizedPatients').add({
            UUID: uid,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            pesel: data.pesel,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
        });
    }

    addPatientAsUser(email: string, uid: string) {
        this.afs.collection('users').doc(uid).set({
            email,
            uid,
            roles: {
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
