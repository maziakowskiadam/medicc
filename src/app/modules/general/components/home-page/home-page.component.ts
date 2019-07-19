import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

    isUnauthorized: boolean;

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.authService.role.subscribe(r => {
            if (r === 'PATIENT_UNAUTHORIZED') {
                this.isUnauthorized = true;
            }
        });
    }

    ngOnDestroy() {
        this.isUnauthorized = false;
    }

}
