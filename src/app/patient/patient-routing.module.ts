import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientIndexComponent } from './patient-index/patient-index.component';
import { ManagementGuard } from '../auth/guards/management.guard';

const routes: Routes = [
    {
        path: 'index',
        component: PatientIndexComponent
    },
    // {
    //     path: 'management',
    //     component: ManagementIndexComponent,
    //     canActivate: [ManagementGuard]
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
