import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { business } from '../interfaces/business';
import { User } from '../interfaces/user';
import { LogInService } from './log-in.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusinessOperationsService {

  selectedBusinessID: string = "";

  constructor(private httpClient:HttpClient, private logged:LogInService) { }

  postNewBusiness(newBusiness: business, changedUser: User){
    const url = environment.postNewBusiness;
    newBusiness.id_user=this.logged.getLoggedUserID();
    console.log(newBusiness.id_user);
    return this.httpClient.post(url, newBusiness)
  }

  getBusinessByID(id: string){
    const url = environment.CRUDNegociosByID+id;
    return this.httpClient.get(url);
  }

  changeBusinessByID(id: string, sampleBusines: business){
    const url = environment.CRUDNegociosByID+id;
    return this.httpClient.put(url, sampleBusines);
  }

  deleteBusinessByID(id: string){
    const url = environment.CRUDNegociosByID+id;
    return this.httpClient.delete(url);
  }

  setSelectedBusinessID(id:string){
    this.selectedBusinessID = id;
  }

  getSelectedBusinessID(){
    return this.selectedBusinessID;
  }

}
