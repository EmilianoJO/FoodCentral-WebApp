import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }

  getUserByID(id:string){
    //console.log(id);
    const url = environment.getUserByIDUsers+id;
    //console.log(url);
    return this.httpClient.get(url);
  }

  putUserByID(id:string, user:User){
    const url = environment.putUserByID+id;
    console.log(user);
    return this.httpClient.put(url, user);
  }
  
}
