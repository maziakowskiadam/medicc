import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Appointment } from '../models/appointment.model';
import { Subject } from 'rxjs';

@Injectable()
export class AppointmentService {

    appointments: Appointment[] = [];
    appointmentsChanged = new Subject<Appointment[]>();

    constructor(
        private db: AngularFirestore,
    ) { }

    addAppointment(appointment: Appointment) {
        this.addDataToDatabase(appointment);
    }

    fetchAllAppointments() {
        this.db.collection('appointments')
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
            }

            );
    }

    private addDataToDatabase(appointment: Appointment) {
        this.db.collection('appointments').add(appointment);
    }
}
