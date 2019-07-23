import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';



@Component({
    selector: 'app-management-add-appointment',
    templateUrl: './management-add-appointment.component.html',
    styleUrls: ['./management-add-appointment.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class ManagementAddAppointmentComponent implements OnInit {

    selectedDoctor: Doctor;
    doctors: Observable<any>;
    startDate = new Date();
    minDate = new Date();
    date = new FormControl(this.startDate);
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(
        private adapter: DateAdapter<any>,
        private dbService: DatabaseService,
    ) {

    }



    ngOnInit() {
        this.adapter.setLocale('pl');
        this.doctors = this.dbService.getAllDoctors();
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
    }

}
