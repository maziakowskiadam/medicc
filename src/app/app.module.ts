import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { GeneralModule } from './general/general.module';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { ResultService } from './shared/services/result.service';
import { AppointmentService } from './shared/services/appointment.service';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        RouterModule,
        GeneralModule,
    ],
    providers: [
        AuthService,
        ResultService,
        AppointmentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
