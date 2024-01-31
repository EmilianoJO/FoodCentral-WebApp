import { Component } from '@angular/core';

import { Comment } from 'src/app/shared/interfaces/comment';
import { CommentService } from 'src/app/shared/services/comment.service';

import { Negocios } from 'src/app/shared/interfaces/negocios';
import { NegociosService } from 'src/app/shared/services/negocios.service';

import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

import { MatDialog } from '@angular/material/dialog';
import { EditCommentDialogComponent } from 'src/app/shared/components/edit-comment-dialog/edit-comment-dialog.component';
import { DeleteCommentDialogComponent } from 'src/app/shared/components/delete-comment-dialog/delete-comment-dialog.component';
import { LogInService } from 'src/app/shared/services/log-in.service';

export interface DialogData{
  newComment:any;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {

  flagComentario:boolean = false;
  reviews: Array<Comment> = [];
  negocios: Array<Negocios> = [];
  usuarios: Array<Usuarios> = [];


  constructor(
     private commentService: CommentService,
     private negocioService: NegociosService,
     private usuarioService: UsuariosService,
     private matDialog:MatDialog,
     private loginService:LogInService) {

      this.traerReview();
      //console.log(this.flagComentario);
    //console.log(this.negocios);
  }
  editDialog(id:any,userId:any,negocioId:any,comment:any){
    let dialogRef = this.matDialog.open(EditCommentDialogComponent,
      {
        data:{
          id:id,
          userId:userId,
          negocioId:negocioId,
          comment:comment
        }
      });
    dialogRef.afterClosed().subscribe(
      result=>{console.log("se cerro el dialog Edit");
      }
    );
  }
  deleteDialog(id:any,userId:any,negocioId:any,comment:any){
    let dialogRef = this.matDialog.open(DeleteCommentDialogComponent,
      {
        data:{
          id:id,
          userId:userId,
          negocioId:negocioId,
          comment:comment
        }
      });
    dialogRef.afterClosed().subscribe(
      //funcion
      result=>{console.log("se cerro el dialog Delete");
      }
    );
  }
  


  traerReview() {
    const loggedId:string = this.loginService.getLoggedUserID();
    this.commentService.getCommentsByUser(loggedId).subscribe((response: any) => {
      this.reviews = response;
      if(this.reviews.length == 0){
        this.flagComentario = true;
        //console.log(this.flagComentario);
      }
      
      //console.log(this.reviews);
    });
    

   }

}
