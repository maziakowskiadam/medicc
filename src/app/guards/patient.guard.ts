import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UiService } from '../shared/services/ui.service';


@Injectable()
export class PatientGuard implements CanActivate {

    role: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private uiService: UiService) {
        this.authService.role.subscribe(r => { this.role = r; });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuth() && this.role === 'PATIENT') {
            return true;
        } else {
            this.uiService.displaySnackbarNotification('You are not authorized to visit patient index.');
            this.router.navigate(['/']);
        }
    }
}
