import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToolbarComponent } from './components/navigation/toolbar/toolbar.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { AboutComponent } from './components/about/about.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
    declarations: [
        SidenavComponent,
        HomePageComponent,
        ToolbarComponent,
        SidenavListComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule
    ],
    exports: [SidenavComponent]
})
export class GeneralModule { }
