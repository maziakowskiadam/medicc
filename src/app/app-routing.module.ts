import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/general/components/home-page/home-page.component';
import { AboutComponent } from './modules/general/components/about/about.component';
import { ManagementGuard } from './guards/management.guard';
import { PatientGuard } from './guards/patient.guard';




const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    // {
    //     path: '',
    //     redirectTo: '/auth/login',
    //     pathMatch: 'full'
    // },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
    },
    {
        path: 'patient',
        loadChildren: () => import('./modules/patient/patient.module').then(mod => mod.PatientModule),
        canActivate: [PatientGuard] // comment out this line to turn on/off AuthGuard
    },
    {
        path: 'management',
        loadChildren: () => import('./modules/management/management.module').then(mod => mod.ManagementModule),
        // canActivate: [ManagementGuard] // comment out this line to turn on/off AuthGuard
    },
    {
        path: 'doctor',
        loadChildren: () => import('./modules/doctor/doctor.module').then(mod => mod.DoctorModule),
        // canActivate: [AuthGuard] // comment out this line to turn on/off AuthGuard
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
        ),
    ],
    exports: [
        RouterModule
    ],
    providers: [
        PatientGuard,
        ManagementGuard
    ]
})
export class AppRoutingModule { }
