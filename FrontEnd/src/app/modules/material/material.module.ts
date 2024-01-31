import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { EditCommentDialogComponent } from 'src/app/shared/components/edit-comment-dialog/edit-comment-dialog.component';
import { DeleteCommentDialogComponent } from 'src/app/shared/components/delete-comment-dialog/delete-comment-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [],
  entryComponents:[
    EditCommentDialogComponent,
    DeleteCommentDialogComponent
  ],

  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule
  ]
})
export class MaterialModule { }
