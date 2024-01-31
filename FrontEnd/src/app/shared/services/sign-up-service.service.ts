import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newUser } from 'src/app/shared/interfaces/newUser';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {

  constructor(private httpClient: HttpClient) { }

  getUsuarios(){
    const url = environment.getusuariosSignUp;
    return this.httpClient.get(url);
  }

  postNewUser(user:newUser){
    const url = environment.postNewUserSignUp;
    return this.httpClient.post(url, user);
  }
}
