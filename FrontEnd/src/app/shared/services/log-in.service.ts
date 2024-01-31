import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newLogIn } from 'src/app/shared/interfaces/logInUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogInService {



  loggedUserID: string = "";
  private helper = new JwtHelperService();
  private loggedUserId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public loggedUserId$: Observable<string> = this.loggedUserId.asObservable();
  constructor(private httpClient:HttpClient) { }

  logInByEmail(user:newLogIn){
    const url = environment.logInByEmail;
    return this.httpClient.post(url, user);
  }

  getLoggedUserID(): string{
    const token: any = localStorage.getItem('token');
    if(token!= null){
      const decodedToken: any = this.helper.decodeToken(token);
      //console.log("Decoded token: ", decodedToken);
    }
    return this.loggedUserId.value;
  }

  setLoggedUserID(userID:string): void{
    this.loggedUserId.next(userID);
  }

  deleteLoggeduserID(): void{
    this.loggedUserId.next("");
  }

  googleLogIn(idToken: string): Observable<any> {
    const url = environment.googleLogIn;
    return this.httpClient.post(url, { googleToken: idToken});
  }
}
