import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Appointment } from '../models/appointment.model';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class DatabaseService {


    // Init

    appointments: Appointment[] = [];
    appointmentsChanged = new Subject<Appointment[]>();
    firebaseSubs: Subscription[] = [];

    constructor(
        private afs: AngularFirestore,
    ) { }


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
