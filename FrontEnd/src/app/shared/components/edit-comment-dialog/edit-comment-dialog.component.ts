import { Component,Inject,OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.scss']
})
export class EditCommentDialogComponent implements OnInit{

  newComment:any = '';
  commentObject:any={};

  constructor(@Inject(MAT_DIALOG_DATA ) public data:{id:any,userId:any,negocioId:any,comment:any},
              private matDialogRef:MatDialogRef<EditCommentDialogComponent>,private commentService:CommentService){
          

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
    this.commentObject = {userId:this.data.userId,negocioId:this.data.negocioId,comment:this.newComment};
    
    this.commentService.updateComment(this.data.id,this.commentObject).subscribe((response:any)=>{
      console.log(response);
    });;
    //console.log(JSON.stringify(this.commentObject),this.data.id);
    this.matDialogRef.close();
  }
}
