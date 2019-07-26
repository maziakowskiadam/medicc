import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { DatabaseService } from 'src/app/shared/services/database.service';
import * as _moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { Appointment } from 'src/app/shared/models/appointment.model';

@Component({
    selector: 'app-patient-book-appointment',
    templateUrl: './patient-book-appointment.component.html',
    styleUrls: ['./patient-book-appointment.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class PatientBookAppointmentComponent implements OnInit, AfterViewInit {

    specializations: Observable<any>;
    today = new Date();
    dataSource = new MatTableDataSource<Appointment>();
    appointments: Appointment[];
    appointmentSubscription: Subscription;
    displayedColumns = ['date', 'timeStart', 'doctor', 'actions'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;


    constructor(
        private adapter: DateAdapter<any>,
        private dbService: DatabaseService
    ) { }

    ngOnInit() {
        this.adapter.setLocale('pl');
        this.specializations = this.dbService.getAllSpecializations();
        this.appointmentSubscription = this.dbService.appointmentsChanged
            .subscribe(appointments => {
                this.dataSource.data = appointments;
            }, error => {
                console.log(error);
            });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onSubmit(f: NgForm) {
        console.log(f.value);
        this.dbService.searchAppointments(f.value.date.toDate());
    }

    refreshTable() {

    }
}
