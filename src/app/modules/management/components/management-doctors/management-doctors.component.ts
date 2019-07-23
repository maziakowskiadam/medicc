import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-management-doctors',
    templateUrl: './management-doctors.component.html',
    styleUrls: ['./management-doctors.component.scss']
})
export class ManagementDoctorsComponent implements OnInit {

    panelAddDoctorOpenState = false;

    constructor() { }

    ngOnInit() {
    }

}
