import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Appointment } from 'src/app/shared/models/appointment.model';

@Component({
    selector: 'app-patient-history',
    templateUrl: './patient-history.component.html',
    styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit, AfterViewInit {

    displayedColumns = ['date', 'doctorId', 'actions'];
    dataSource = new MatTableDataSource<Appointment>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private appointmentService: AppointmentService
    ) { }


    ngOnInit() {
        this.dataSource.data = this.appointmentService.getAppointments();
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
}
