import { FocusMonitor } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { newLogIn } from 'src/app/shared/interfaces/logInUser';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/shared/services/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  private helper = new JwtHelperService();

  SignInForm: FormGroup;
  email: string = "";
  password: string = "";
  user: newLogIn = {
    email: "",
    password: ""
  };
  correctData: boolean = false;
  constructor(formBuilder:FormBuilder,
              private logInService: LogInService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private tokenService: TokenService){
    this.SignInForm = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  logIn(){
    this.user.email = this.email;
    this.user.password = this.password;
    this.logInService.logInByEmail(this.user).subscribe(
      (response: any) => {
        console.log(response.response);
        this.logInService.setLoggedUserID(response.response._id);
        this.tokenService.setToken(response.token);
        console.log(response.response.userType);
        if(response.response.userType == "Owner"){
          this.router.navigate(["/Owner-View"]);
        } else if(response.response.userType == "SuperUser"){
          console.log("Es admin");
          this.router.navigate(["/admin-view"]);
        } 
        else {
          this.router.navigate([""]);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.openSnackBar("Credenciales incorrectas", "Intenta de nuevo")
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
