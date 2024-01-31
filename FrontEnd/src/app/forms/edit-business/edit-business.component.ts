import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { BusinessOperationsService } from 'src/app/shared/services/business-operations.service';
import { business } from 'src/app/shared/interfaces/business';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from 'src/app/shared/services/token.service';
import { FilesService } from 'src/app/shared/services/files.service';
@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.scss']
})
export class EditBusinessComponent implements OnInit{
  BusinessForm: FormGroup;
  private imageObj: File = new File([], "");
  private helper = new JwtHelperService();

  imageUrl: string = "";  
  fileExtensionForHTML: any;

  businessName: string = "";
  businessAddress: string = "";

  businessDescription: string = "";
  businessOpenHour: string = "";
  businessOpenMinutes: string = "";
  businessOpenTemp: string = "";
  businessCloseHour: string = "";
  businessCloseMinutes: string = "";
  businessCloseTemp: string = "";

  sampleBusines: business = {
    name: "",
    address: "",
    mediaPieceFormat: "",
    description: "",
    closeTime: "",
    openTime: ""
  };

  constructor(private businessOpsService: BusinessOperationsService,
    formBuilder:FormBuilder,
    private router: Router,
    private logInService: LogInService,
    private tokenService: TokenService,
    private filesService: FilesService){
    const decodedToken = this.helper.decodeToken(this.tokenService.getToken());
    console.log("decoded token:");
    console.log(decodedToken);
    let tokenID = decodedToken.id;
    this.logInService.setLoggedUserID(tokenID);
    let ID:string = this.logInService.getLoggedUserID();
      this.BusinessForm = formBuilder.group({
        businessName: [this.businessName, [Validators.required]],
        businessAddress: [this.businessAddress, [Validators.required]],
        businessDescription: [this.businessDescription, [Validators.required]],
        businessOpenHour: [this.businessOpenHour, [Validators.required]],
        businessOpenMinutes: [this.businessOpenMinutes, [Validators.required]],
        businessOpenTemp: [this.businessOpenTemp, [Validators.required]],
        businessCloseHour: [this.businessCloseHour, [Validators.required]],
        businessCloseMinutes: [this.businessCloseMinutes, [Validators.required]],
        businessCloseTemp: [this.businessCloseTemp, [Validators.required]],
      });
    let businessID: any= localStorage.getItem('businessID');
    this.businessOpsService.setSelectedBusinessID(businessID);
    }

    ngOnInit(): void {
      this.businessOpsService.getBusinessByID(this.businessOpsService.getSelectedBusinessID()).subscribe((response:any) =>{
        console.log(response);
        this.businessAddress = response.address;
        this.businessName = response.name;
        this.businessDescription = response.description;
        this.businessOpenHour = (response.openTime).substring(0, 2);
        this.businessOpenMinutes = response.openTime.substring(3, 5);
        this.businessOpenTemp = response.openTime.substring(6, 8);
        this.businessCloseHour = response.closeTime.substring(0, 2);
        this.businessCloseMinutes = response.closeTime.substring(3, 5);
        this.businessCloseTemp = response.closeTime.substring(6, 8);
      });
    }

    onFileSelected(event:any): void{
      const File = event.target.files[0];
      this.imageObj = File;
      console.log(this.imageObj);
    }

    editCurrentBusiness(){
      this.businessOpsService.getBusinessByID(this.businessOpsService.getSelectedBusinessID()).subscribe((response:any) =>{
        console.log(response);
        this.sampleBusines.name = this.businessName;
        this.sampleBusines.address = this.businessAddress;
        this.sampleBusines.mediaPieceFormat = response.mediaPieceFormat;
        this.sampleBusines.description = this.businessDescription;
        this.sampleBusines.openTime = this.businessOpenHour + ":" + this.businessOpenMinutes + ":" + this.businessOpenTemp;
        this.sampleBusines.closeTime = this.businessCloseHour + ":" + this.businessCloseMinutes + ":" + this.businessCloseTemp;
        this.businessOpsService.changeBusinessByID(this.businessOpsService.getSelectedBusinessID(), this.sampleBusines).subscribe((responseBusiness: any) =>{
          console.log(response);
          const imageForm = new FormData();
          let fileName:string = responseBusiness._id;
          let fileExtension: any = this.imageObj.name.split('.').pop();
          this.fileExtensionForHTML = fileExtension;
          imageForm.append("image", this.imageObj, fileName + '.' + fileExtension);
          this.filesService.sendBusinessPicture(imageForm).subscribe((response:any) =>{
            this.imageUrl = response['image'];
            localStorage.removeItem('businessID');
            this.router.navigate(['Owner-View']);
          });
        });
      });
    }

    goBack(){
      this.router.navigate(['/Owner-View']);
    }
}
