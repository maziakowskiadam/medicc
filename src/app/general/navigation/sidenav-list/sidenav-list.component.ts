import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

    isAuth = false;
    authSubscription: Subscription;

    @Output()
    sidenavClose = new EventEmitter<void>();

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authSubscription = this.authService.authStatus.subscribe(
            authStatus => {
                this.isAuth = authStatus;
            }
        );
    }

    onLogout() {
        this.onClose();
        this.authService.logout();
    }

    onClose() {
        this.sidenavClose.emit();
    }

}
