import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }

  getComment(){
    const url:string = environment.getPostCommentCOmments;
    return this.httpClient.get(url);
  }
  getCommentById(id:string){
    const url:string = environment.commentByIDComment+id;
    return this.httpClient.get(url);
  }
  getCommentsByUser(id:string){
    const url:string = environment.commentByIDComment+'usuario/'+id;
    return this.httpClient.get(url);
  }

  deleteComment(id:string){
    const url:string = environment.commentByIDComment+id;
    return this.httpClient.delete(url);
  }
  updateComment(id:any,comment:any){
    const url:string = environment.commentByIDComment+id;
    //console.log(id,comment);
    return this.httpClient.put(url,comment);
  }

  postComment(newComment:any){
    const url:string = environment.getPostCommentCOmments;
    return this.httpClient.post(url, newComment);
  }
}
