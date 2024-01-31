import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from '../interfaces/publicacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  url:string = environment.publicacionesURL;
  constructor(private httpClient:HttpClient) { }

  getPublicacion(){
    return this.httpClient.get(this.url);
  }

  getPublicacionById(post_id:any){
    const url:string = environment.publicacionesURL+post_id;
    return this.httpClient.get(url);
  }

  updatePublicacion(post_id:any, updatedPost:any){
    const url:string = environment.publicacionesURL+post_id;
    return this.httpClient.put(url, updatedPost);
  }

  createPublicacion(newPost:any){
    return this.httpClient.post(this.url, newPost);
  }

}
