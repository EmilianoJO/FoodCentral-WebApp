import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  postID: string = "";

  constructor(private httpClient:HttpClient) { }

  postNewBusinessPostByID(postBody:Post){
    const url = environment.postURL;
    return this.httpClient.post(url, postBody);
  }

  setTargetBusinessID(newID:string){
    this.postID = newID;
  }

  getTargetBusinessID(){
    return this.postID;
  }
}
