import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BusinessOperationsService } from 'src/app/shared/services/business-operations.service';
import { business } from 'src/app/shared/interfaces/business';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { HttpClient } from '@angular/common/http';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-new-business-form',
  templateUrl: './new-business-form.component.html',
  styleUrls: ['./new-business-form.component.scss']
})
export class NewBusinessFormComponent implements OnInit{
  private imageObj: File = new File([], "");
  imageUrl: string = "";  
  fileExtensionForHTML: any;
  private fileName: string = "";
  BusinesForm: FormGroup;
  businessName: string = "";
  businessAddress: string = "";
  businessDescription: string = "";
  businessOpenHour: string = "";
  businessOpenMinutes: string = "";
  businessOpenTemp: string = "";
  businessCloseHour: string = "";
  businessCloseMinutes: string = "";
  businessCloseTemp: string = "";
  userID: string = "";
  sampleBusines: business = {
    name: "",
    address: "",
    mediaPieceFormat: "",
    description: "",
    openTime: "",
    closeTime: ""
  };

genericUser: User = {
  bName: "",
  email: "",
  negocios: [],
  negociosSeguidos: [],
  password: "",
  userType: ""
}

  constructor(formBuilder: FormBuilder,
              private addBusinessService: BusinessOperationsService,
              private router:Router,
              private logInService: LogInService,
              private userService: UsersService,
              private filesService: FilesService,
              private httpClient:HttpClient){
    this.BusinesForm = formBuilder.group({
      businessName: ["", [Validators.required]],
      businessAddress: ["", [Validators.required]],
      businessDescription: ["", [Validators.required]],
      businessOpenHour: ["", [Validators.required]],
      businessOpenMinutes: ["", [Validators.required]],
      businessOpenTemp: ["", [Validators.required]],
      businessCloseHour: ["", [Validators.required]],
      businessCloseMinutes: ["", [Validators.required]],
      businessCloseTemp: ["", [Validators.required]],
      check: [false, Validators.requiredTrue]
    });

    let token = localStorage.getItem('token');

    let ID:string = this.logInService.getLoggedUserID(); 
    console.log(ID);
  }

  ngOnInit(): void {
    this.userService.getUserByID(this.logInService.getLoggedUserID()).subscribe((response:any) => {
      this.genericUser = response;
      console.log(this.genericUser);
    });
  }

  onFileSelected(event:any): void{
    const File = event.target.files[0];
    this.imageObj = File;
    console.log(this.imageObj);
  }

  postNewBusiness(){
    this.sampleBusines.name = this.businessName;
    this.sampleBusines.address = this.businessAddress;
    this.sampleBusines.description = this.businessDescription;
    this.sampleBusines.mediaPieceFormat = this.imageObj.name.split('.').pop();
    this.sampleBusines.closeTime = this.businessCloseHour + ":" + this.businessCloseMinutes + "" + this.businessCloseTemp;
    this.sampleBusines.openTime = this.businessOpenHour + ":" + this.businessOpenMinutes + "" + this.businessOpenTemp;
    this.addBusinessService.postNewBusiness(this.sampleBusines, this.genericUser).subscribe((responseBusiness:any) =>{
      this.genericUser.negocios.push(responseBusiness._id);
      this.userService.putUserByID(this.logInService.getLoggedUserID(), this.genericUser).subscribe((responseUser:any)=>{
        console.log(responseUser);
        const imageForm = new FormData();
        let fileName:string = responseBusiness._id;
        let fileExtension: any = this.imageObj.name.split('.').pop();
        this.fileExtensionForHTML = fileExtension;
        imageForm.append("image", this.imageObj, fileName + '.' + fileExtension);
        this.filesService.sendBusinessPicture(imageForm).subscribe((response:any) =>{
          this.imageUrl = response['image'];
          this.router.navigate(['Owner-View']);
        });
      });
    });
  }

  goBack(){
    this.router.navigate(['Owner-View']);
  }
}
