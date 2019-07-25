import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Patient } from 'src/app/shared/models/patient.model';


@Component({
    selector: 'app-confirm-patient-dialog',
    templateUrl: 'confirm-patient-dialog.html',

})
export class ConfirmPatientDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ConfirmPatientDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Patient,
    ) {
        console.log(this.data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
