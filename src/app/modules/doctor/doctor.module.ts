import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorIndexComponent } from './components/doctor-index/doctor-index.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        DoctorIndexComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        DoctorRoutingModule,
    ]
})
export class DoctorModule { }
