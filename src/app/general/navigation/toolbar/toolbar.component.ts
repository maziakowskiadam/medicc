import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {


    isAuth = false;
    authSubscription: Subscription;

    @Output()
    sidenavToggle = new EventEmitter<void>();

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

    onToggleSidenav() {
        this.sidenavToggle.emit();
    }

    onLogout() {
        this.authService.logout();
    }


    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
