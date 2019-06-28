import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';



const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/auth/signup',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
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
    ]
})
export class AppRoutingModule { }
