import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './general/home-page/home-page.component';
import { AboutComponent } from './general/about/about.component';
import { AuthGuard } from './auth/guards/auth.guard';



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
        loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
    },
    {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(mod => mod.PatientModule),
        canActivate: [AuthGuard] // comment out this line to turn on/off AuthGuard
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
        AuthGuard
    ]
})
export class AppRoutingModule { }
