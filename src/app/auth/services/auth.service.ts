import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs';

export class AuthService {

    authStatus = new Subject<boolean>();
    private user: User;

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: `${Math.round(Math.random() * 1000000)}`
        };
        this.authStatus.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: `${Math.round(Math.random() * 1000000)}`
        };
        this.authStatus.next(true);
    }

    logout() {
        this.user = null;
        this.authStatus.next(false);
    }

    getUser() {
        return { ... this.user };
    }

    isAuth() {
        return this.user != null;
    }



}
