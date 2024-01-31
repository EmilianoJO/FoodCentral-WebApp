import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsServiceService } from 'src/app/shared/services/posts-service.service';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { Post } from 'src/app/shared/interfaces/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  postForm: FormGroup;
  postTitle: string = "";
  postDescription: string = "";
  genericPost: Post = {
    title: "",
    description: "",
    id_negocio: ""
  }

  constructor(formBuilder: FormBuilder,
    private postService: PostsServiceService,
    private logInService:LogInService,
    private router: Router) {
    this.postForm = formBuilder.group({
      postTitle: ["", [Validators.required]],
      postDescription: ["", [Validators.required]]
    })
  }

  postNewBusinessPost(){
    let ID = this.postService.getTargetBusinessID();
    this.genericPost.title = this.postTitle;
    this.genericPost.description = this.postDescription;
    this.genericPost.id_negocio = ID;
    console.log(this.genericPost);
    this.postService.postNewBusinessPostByID(this.genericPost).subscribe((response: any) =>{
      console.log(response);
      this.router.navigate(['/Owner-View'])
    })
  }
}
