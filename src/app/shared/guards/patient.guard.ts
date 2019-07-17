import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, map, take } from 'rxjs/operators';
import { User } from '../../modules/auth/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class PatientGuard implements CanActivate {

    constructor(private authService: AuthService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {


        return this.authService.user$.pipe(
            take(1),
            map((user) => user && user.roles.patient ? true : false),
            tap(isPatient => {
                if (!isPatient) {
                    console.error('Access denied - Patients only');
                }
            })
        );


    }
}
