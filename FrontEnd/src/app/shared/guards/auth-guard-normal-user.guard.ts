import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenNormalUserService } from '../services/token-normal-user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardNormalUserGuard implements CanActivate {
  constructor(private tokenService: TokenNormalUserService,
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
        } else if(role == "SuperUser"){
          this.router.navigate(["admin-view"]);
        }
      }
      return false;
    }
  }
  
}
