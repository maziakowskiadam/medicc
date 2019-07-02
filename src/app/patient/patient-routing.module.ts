import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientIndexComponent } from './patient-index/patient-index.component';

const routes: Routes = [
    {
        path: 'index',
        component: PatientIndexComponent
    }
    // {
    //     path: 'login',
    //     component: LoginComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
