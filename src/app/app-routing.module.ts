import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './general/home-page/home-page.component';



const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
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
