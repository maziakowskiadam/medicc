import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-management-patients',
    templateUrl: './management-patients.component.html',
    styleUrls: ['./management-patients.component.scss']
})
export class ManagementPatientsComponent implements OnInit {

    panelAppointPatientOpenState = false;
    panelConfirmPatientOpenState = false;
    panelAddPatientAccountOpenState = false;


    constructor() { }

    ngOnInit() {
    }

}
