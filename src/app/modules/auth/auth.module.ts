import { NgModule } from '@angular/core';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        SharedModule,
        AuthRoutingModule,
        AngularFireAuthModule
    ],
    exports: []
})
export class AuthModule { }
