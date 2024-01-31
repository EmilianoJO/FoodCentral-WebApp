import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private httpClient: HttpClient) { }

  sendBusinessPicture(formData:any) {
    const ulrFileBusiness = environment.businessPictureUpload;
    console.log(formData);
    let data:any = formData.get("image");
    console.log("Image data:");
    console.log(data);
    let obj = {'image':data}
    return this.httpClient.post(ulrFileBusiness, formData);
  }
}
