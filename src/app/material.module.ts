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
        MatMomentDateModule

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
        MatMomentDateModule
    ],
})
export class MaterialModule { }
