import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Appointment } from 'src/app/shared/models/appointment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-patient-history',
    templateUrl: './patient-history.component.html',
    styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit, AfterViewInit, OnDestroy {

    displayedColumns = ['date', 'doctor', 'actions'];
    dataSource = new MatTableDataSource<Appointment>();
    appointments: Appointment[];
    appointmentSubscription: Subscription;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private appointmentService: AppointmentService,
        private db: AngularFirestore
    ) { }


    ngOnInit() {
        this.appointmentSubscription = this.appointmentService.appointmentsChanged
            .subscribe(appointments => {
                this.dataSource.data = appointments;
            }, error => {
                console.log(error);
            }

            );
        this.appointmentService.fetchAllAppointments();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnDestroy() {
        this.appointmentSubscription.unsubscribe();
    }
}
