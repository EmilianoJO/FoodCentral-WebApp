import { Injectable } from '@angular/core';
import { CommentWithResponse } from '../interfaces/commentAndResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  currentResponse: string = "";

  constructor(private httpClient: HttpClient) { }

  putResponse(id:string, body: CommentWithResponse){
    const url = environment.putResponseResponse+id;
    return this.httpClient.put(url, body);
  }

  getCurrentResponse(){
    return this.currentResponse;
  }

  setCurrentResponse(response: string){
    this.currentResponse = response;
  }
}
