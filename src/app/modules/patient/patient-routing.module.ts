import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientIndexComponent } from './components/patient-index/patient-index.component';

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
