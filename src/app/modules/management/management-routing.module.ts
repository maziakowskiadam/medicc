import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementIndexComponent } from './components/management-index/management-index.component';

const routes: Routes = [
    {
        path: 'index',
        component: ManagementIndexComponent
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
export class ManagementRoutingModule { }
