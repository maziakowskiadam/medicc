import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementIndexComponent } from './components/management-index/management-index.component';
import { ManagementRoutingModule } from './management-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ManagementIndexComponent
    ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        FormsModule
    ]
})
export class ManagementModule { }
