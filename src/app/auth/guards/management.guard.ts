import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';


@Injectable()
export class ManagementGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuth()) {
            console.log('in management guard');
            return true;
        } else {
            console.error('Must be authenticated to visit patient management.');
            this.router.navigate(['/auth/login']);
        }
    }
}
