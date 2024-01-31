import { Component,Inject,OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-delete-comment-dialog',
  templateUrl: './delete-comment-dialog.component.html',
  styleUrls: ['./delete-comment-dialog.component.scss']
})
export class DeleteCommentDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA ) public data:{id:any,userId:any,negocioId:any,comment:any},
              private matDialogRef:MatDialogRef<DeleteCommentDialogComponent>,private commentService:CommentService){
          

  }
  ngOnInit(): void{
    //alert(this.data);
  }
  ngOnDestroy(){
    this.matDialogRef.close(this.data);
  }
  onCloseClick(){
    this.matDialogRef.close();
  }
  onSaveClick(){
    this.commentService.deleteComment(this.data.id).subscribe((response:any)=>{
      console.log(response);
    });
    
    this.matDialogRef.close();
  }
}
