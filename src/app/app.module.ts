import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { UiService } from './shared/services/ui.service';
import { DatabaseService } from './shared/services/database.service';
import { GeneralModule } from './modules/general/general.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { reducers } from './shared/store/reducers/app.reducer';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AppRoutingModule,
        AuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        GeneralModule,
        MaterialModule,
        RouterModule,
        SharedModule,
        StoreModule.forRoot(reducers)
    ],
    providers: [
        AuthService,
        DatabaseService,
        UiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
