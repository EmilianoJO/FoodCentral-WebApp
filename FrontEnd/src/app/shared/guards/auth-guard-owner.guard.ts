import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenOwnerService } from '../services/token-owner.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardOwnerGuard implements CanActivate {
  constructor(private router:Router,
    private tokenService: TokenOwnerService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenService.isAuth()){
      return true;
    } else {
      let token = this.tokenService.getToken(); 
      if(token != ''){
        let helper = new JwtHelperService();
        let role: string = helper.decodeToken(token).role;
        if(role == "Normal"){
          this.router.navigate(["/"]);
        } else if(role == "SuperUser"){
          this.router.navigate(["admin-view"]);
        }
      }
      return false;
    }
  }
  
}
