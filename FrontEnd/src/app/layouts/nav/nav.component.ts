import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  adminLogged:boolean = false;
  logged: boolean = false;
  enableRevs: boolean = true;
  private helper = new JwtHelperService();

  constructor(private tokenService: TokenService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private logInService: LogInService){
      
      this.socialAuthService.authState.subscribe((user: SocialUser) =>{
        if(user){
          console.log("Usuario de google: ", user);
          this.logInService.googleLogIn(user.idToken).subscribe(response => {
            this.tokenService.setToken(response.token);
            this.router.navigate(['']);
            this.logged = true;
            this.enableRevs = true;
          });
        }
      });

      if(localStorage.getItem('token')!=null){
        let token:any = localStorage.getItem('token');
        let idFromToken:string = this.helper.decodeToken(token).id;
        console.log(this.helper.decodeToken(token).role);
        if (this.helper.decodeToken(token).role == "Owner"){
          this.enableRevs = false;
        } else if(this.helper.decodeToken(token).role == "SuperUser"){
          this.adminLogged = true;
        }
        console.log("ID from token: " + idFromToken)
        this.logInService.setLoggedUserID(idFromToken);
      }

      this.logInService.loggedUserId$.subscribe((res)=>{
        if(res!=""){
          this.logged = true;
        }
      })
    }

  signOut(): void {
    if(this.logged){
      this.logged = false;
      this.tokenService.deleteToken();
      this.logInService.deleteLoggeduserID();
      this.enableRevs = false;
      this.router.navigate(['/Sign-In-Menu']);
    }
  }

  changePage(){
    let token:any = localStorage.getItem('token');
    if(token != null){
      if(this.helper.decodeToken(token).role == "Owner"){
        this.router.navigate(['/Owner-View']);
      } else if(this.helper.decodeToken(token).role == "SuperUser"){
        this.router.navigate(['/admin-view']);
      } 
      else {
        this.router.navigate(['/']);
      }
    }
  }
}
