import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-management-add-doctor',
    templateUrl: './management-add-doctor.component.html',
    styleUrls: ['./management-add-doctor.component.scss']
})
export class ManagementAddDoctorComponent implements OnInit {

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {
        this.authService.registerNewDoctor(
            {
                email: f.value.email,
                password: f.value.password
            },
            {
                email: f.value.email,
                firstName: f.value.firstName,
                lastName: f.value.lastName,
                specialization: f.value.specialization
            });
        f.resetForm();
    }
}
