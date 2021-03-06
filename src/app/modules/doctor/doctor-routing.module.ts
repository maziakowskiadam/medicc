import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorIndexComponent } from './components/doctor-index/doctor-index.component';

const routes: Routes = [
    {
        path: 'index',
        component: DoctorIndexComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorRoutingModule { }
