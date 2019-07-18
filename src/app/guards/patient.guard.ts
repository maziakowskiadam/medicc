import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { UiService } from '../shared/services/ui.service';


@Injectable()
export class PatientGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private uiService: UiService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.uiService.displaySnackbarNotification('You are not authorized to visit patient index.');
            this.router.navigate(['/']);
        }
    }
}
