import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/shared/models/user.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-management-confirm-patient',
    templateUrl: './management-confirm-patient.component.html',
    styleUrls: ['./management-confirm-patient.component.scss']
})
export class ManagementConfirmPatientComponent implements OnInit, AfterViewInit, OnDestroy {

    dataSource = new MatTableDataSource<User>();
    displayedColumns = ['name', 'pesel', 'actions'];
    unauthorizedPatientUsers: User[] = [];
    unauthorizedPatientUsersSub: Subscription;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private dbService: DatabaseService,
    ) { }

    ngOnInit() {
        this.unauthorizedPatientUsersSub = this.dbService.unauthorizedPatientUsersChanged
            .subscribe(users => {
                this.dataSource.data = users.filter(r => r.roles.patientUnauthorized);
                console.log(this.dataSource.data);
            }, error => {
                console.log(error);
            });
        this.dbService.getUnauthorizedPatientUsers();
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
        if (this.unauthorizedPatientUsersSub) {
            this.unauthorizedPatientUsersSub.unsubscribe();
        }
    }
}
