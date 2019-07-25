import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { User } from 'src/app/shared/models/user.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, } from '@angular/material';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/shared/models/patient.model';
import { ConfirmPatientDialogComponent } from './confirm-patient-dialog.component';


@Component({
    selector: 'app-management-confirm-patient',
    templateUrl: './management-confirm-patient.component.html',
    styleUrls: ['./management-confirm-patient.component.scss']
})
export class ManagementConfirmPatientComponent implements OnInit, AfterViewInit, OnDestroy {

    dataSource = new MatTableDataSource<User>();
    displayedColumns = ['name', 'pesel', 'actions'];
    unauthorizedPatients: User[] = [];
    unauthorizedPatientsSub: Subscription;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private dbService: DatabaseService,
        private dialog: MatDialog,

    ) { }

    ngOnInit() {
        this.unauthorizedPatientsSub = this.dbService.unauthorizedPatientChanged
            .subscribe(users => {
                this.dataSource.data = users;
            }, error => {
                console.log(error);
            });
        this.dbService.getUnauthorizedPatients();
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

    onActivateClicked(patient: Patient) {
        this.openDialog(patient);

    }

    openDialog(patient: Patient): void {
        const dialogRef = this.dialog.open(ConfirmPatientDialogComponent, {
            width: '400px',
            data: { patient }
        });

        dialogRef.afterClosed().subscribe(result => { this.dbService.authorizePatient(result); });
    }

    ngOnDestroy() {
        if (this.unauthorizedPatientsSub) {
            this.unauthorizedPatientsSub.unsubscribe();
        }
    }
}
