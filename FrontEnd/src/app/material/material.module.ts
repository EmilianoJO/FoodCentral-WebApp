import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { EditCommentDialogComponent } from 'src/app/shared/components/edit-comment-dialog/edit-comment-dialog.component';
import { DeleteCommentDialogComponent } from 'src/app/shared/components/delete-comment-dialog/delete-comment-dialog.component';
import { MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [],
  entryComponents:[
    EditCommentDialogComponent,
    DeleteCommentDialogComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
