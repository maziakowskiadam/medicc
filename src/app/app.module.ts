import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { PatientIndexComponent } from './patient/patient-index/patient-index.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { GeneralModule } from './general/general.module';


@NgModule({
    declarations: [
        AppComponent,
        PatientIndexComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        RouterModule,
        GeneralModule

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
