import { Component, Inject,OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '../../services/comment.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.scss']
})
export class AddCommentDialogComponent implements OnInit{

  newComment:string = ''
  commentObject:any={};
  socket: any;

  constructor(@Inject(MAT_DIALOG_DATA ) public data:{negocioId:any,name:any,address:any,userId:any,negocio_userId:any},
              private matDialogRef:MatDialogRef<AddCommentDialogComponent>,private commentService:CommentService){
          

  }
  ngOnInit(): void{
    //alert(this.data);
    this.socket = io(environment.apiUrl);
  }
  ngOnDestroy(){
    this.matDialogRef.close(this.data);
  }
  onCloseClick(){
    this.matDialogRef.close();
  }
  onSaveClick(){
    this.commentObject = {userId:this.data.userId,negocioId:this.data.negocioId,comment:this.newComment};

    this.socket.emit('newComment',this.data.negocio_userId);

    this.commentService.postComment(this.commentObject).subscribe((response:any)=>{
      console.log(response);
    });;
    this.matDialogRef.close();
  }

}
