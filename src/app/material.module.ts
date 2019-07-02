import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSelectModule

} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatSelectModule


    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatSnackBarModule,
        MatSelectModule

    ],
})
export class MaterialModule { }
