import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, Form, NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    // email = new FormControl('', [Validators.required, Validators.email]);
    // password = new FormControl('', [Validators.required]);

    constructor() { }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
    }

    onRegisterClicked() {
        console.log('register clicked');
    }

}
