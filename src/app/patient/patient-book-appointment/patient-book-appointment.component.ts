import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-patient-book-appointment',
    templateUrl: './patient-book-appointment.component.html',
    styleUrls: ['./patient-book-appointment.component.scss']
})
export class PatientBookAppointmentComponent implements OnInit {



    constructor() { }

    specializations: Specialization[] = [
        { name: 'internista' },
        { name: 'ortopeda' },
        { name: 'kardiolog' }
    ];

    ngOnInit() {
    }

    selected = 'żadna';
}

export interface Specialization {
    name?: string;
}
