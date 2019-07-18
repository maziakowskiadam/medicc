import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DoctorIndexComponent } from './components/doctor-index/doctor-index.component';
import { DoctorRoutingModule } from './doctor-routing.module';

@NgModule({
    declarations: [
        DoctorIndexComponent
    ],
    imports: [
        CommonModule,
        DoctorRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        FormsModule
    ]
})
export class DoctorModule { }
