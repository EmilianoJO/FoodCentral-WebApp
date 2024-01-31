import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenNormalUserService {

  authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private helper = new JwtHelperService();
  
  constructor() { 
    this.authStatus.next(this.isAuth());
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.authStatus.next(true);
  }

  getToken(): string{
    return localStorage.getItem('token') || '';
  }
  
  deleteToken(): void{
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  isAuth(): boolean{
    let token: string = this.getToken();
    if(!!this.getToken()){
      if(this.helper.decodeToken(token).role == "Normal"){
        return true;
      }
    }
    return false; 
  }
}
