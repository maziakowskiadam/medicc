import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    sidenavOpened = false;

    onShowSidenavClicked() {
        this.sidenavOpened = !this.sidenavOpened;
        console.log(this.sidenavOpened);
    }


}
