import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    sidenavOpened = false;

    constructor(private authService: AuthService) { }

    onShowSidenavClicked() {
        this.sidenavOpened = !this.sidenavOpened;
        console.log(this.sidenavOpened);
    }

    ngOnInit(): void {
        this.authService.initAuthListener();
    }


}
