import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-management-administration',
    templateUrl: './management-administration.component.html',
    styleUrls: ['./management-administration.component.scss']
})
export class ManagementAdministrationComponent implements OnInit {

    panelAddAppointmentOpenState = false;
    panelAddDoctorOpenState = false;

    constructor() { }

    ngOnInit() {
    }

}
