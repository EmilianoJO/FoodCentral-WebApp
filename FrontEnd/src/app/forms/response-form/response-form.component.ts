import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseService } from 'src/app/shared/services/response.service';
import { CommentsServiceService } from 'src/app/shared/services/comments-service.service';
import { CommentWithResponse } from 'src/app/shared/interfaces/commentAndResponse';
import { Router } from '@angular/router';
import { PostsServiceService } from 'src/app/shared/services/posts-service.service';

@Component({
  selector: 'app-response-form',
  templateUrl: './response-form.component.html',
  styleUrls: ['./response-form.component.scss']
})
export class ResponseFormComponent implements OnInit{
  responseForm :FormGroup;

  putDescription: string = "";

  genericBody: CommentWithResponse = {
    userID: "",
    comment: "",
    response: "",
    negocioID: ""
  }

  constructor(private formBuilder:FormBuilder,
    private responseService: ResponseService,
    private commentService: CommentsServiceService,
    private router: Router,
    private postService: PostsServiceService) {
    this.responseForm = formBuilder.group({
      response: [Validators.required]
    });
    let businessID: any= localStorage.getItem('businessID');
    this.postService.setTargetBusinessID(businessID);
  }

  ngOnInit(): void {
    this.putDescription = this.responseService.getCurrentResponse();
  }

  putNewResponseInComment(){
    let id = this.commentService.getComentarioID();
    console.log("ID del comentario: "+ id);
    this.commentService.getCommentById(id).subscribe((response:any) =>{
      console.log(response);
      this.genericBody.userID = response.userId;
      this.genericBody.comment = response.comment;
      this.genericBody.response = this.putDescription;
      this.genericBody.negocioID = response.negocioId;
      console.log(this.genericBody);
      this.responseService.putResponse(id, this.genericBody).subscribe((response2:any)=>{
        console.log(response2);
        this.router.navigate(['/Owner-View']);
      });
    });
  }
}
