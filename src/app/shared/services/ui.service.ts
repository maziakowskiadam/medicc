import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {

    loadingStateChanged = new Subject<boolean>();

    constructor(
        private snackBar: MatSnackBar
    ) { }

    displaySnackbarNotification(message: string) {
        this.snackBar.open(
            message,
            null,
            { duration: 4000 });
    }
}
