import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SignUpServiceService } from 'src/app/shared/services/sign-up-service.service';
import { newUser } from 'src/app/shared/interfaces/newUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  SignUpForm: FormGroup;
  user: newUser = {
    bName: "",
    password: "",
    email: "",
    userType: ""
  };
  name: string = "";
  email: string = "";
  password: string = "";
  owner: boolean = false;
  constructor(formBuilder: FormBuilder,
      private signUpService: SignUpServiceService,
      private router: Router){
    this.SignUpForm = formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required,Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{2,30}$/)]],
      confirmPassword: ["", [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{2,30}$/)]],
      check: [false, Validators.requiredTrue]
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true }
  }

  postNewUser(){
    this.user.bName = this.name;
    this.user.email = this.email;
    this.user.userType = (!this.owner) ? "Normal" : "Owner";
    this.user.password = this.password;
    console.log(this.user);
    this.signUpService.postNewUser(this.user).subscribe((response:any) =>{
      if(this.user.userType == "Normal"){
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/Owner-View']);
      }
    });
  }

  isOwnerChanged(){
    this.owner = (!this.owner) ? true : false;
  }
}
