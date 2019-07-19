import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-management-patients',
    templateUrl: './management-patients.component.html',
    styleUrls: ['./management-patients.component.scss']
})
export class ManagementPatientsComponent implements OnInit {

    panelOpenState = false;

    constructor() { }

    ngOnInit() {
    }

}
