import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UiService } from '../shared/services/ui.service';
import { Subscription } from 'rxjs';


@Injectable()
export class ManagementGuard implements CanActivate {

    role: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private uiService: UiService) {
        this.authService.role.subscribe(r => { this.role = r; });
    }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isAuth() && this.role === 'MANAGEMENT') {
            return true;
        } else {
            this.uiService.displaySnackbarNotification('You are not authorized to visit management index.');
            this.router.navigate(['/']);
        }
    }
}
