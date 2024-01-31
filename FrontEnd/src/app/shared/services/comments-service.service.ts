import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentOwner } from '../interfaces/commentForOwners';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {

  negocioIDtosearchComment: string = "";
  comentarioID: string = "";

  genericComment: CommentOwner = {
    userID: "",
    comment: "",
    negocioID: ""
  }

  constructor(private httpClient: HttpClient) { }

  getCommentsFromBusinessId(id:string){
    const url = environment.getCommentsFromBCommentsServiceService+id
    return this.httpClient.get(url);
  }

  getCommentById(id: string){
    const url = environment.getCommentByIDCommentsServiceService+id;
    return this.httpClient.get(url);
  }

  getNegocioID(){
    return this.negocioIDtosearchComment;
  }

  setNegocioID(id: string){
    this.negocioIDtosearchComment = id;
  }

  getComentarioID(){
    return this.comentarioID;
  }

  setComentarioID(id: string){
    this.comentarioID = id;
  }
}
