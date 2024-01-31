import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenSuperUserService } from '../services/token-super-user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardSuperUserGuard implements CanActivate {
  constructor(private tokenService: TokenSuperUserService,
    private router: Router){}
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
        if(role == "Owner"){
          this.router.navigate(["Owner-View"]);
        } else if(role == "Normal"){
          this.router.navigate(["/"]);
        }
      }
      return false;
    }
  }
}
