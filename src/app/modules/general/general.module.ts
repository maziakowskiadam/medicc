import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { AboutComponent } from './about/about.component';


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
