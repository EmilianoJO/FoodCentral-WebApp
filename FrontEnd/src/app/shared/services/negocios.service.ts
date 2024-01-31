import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { LogInService } from 'src/app/shared/services/log-in.service';


@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  constructor(private httpClient:HttpClient, private loginService:LogInService) { }

  getNegociosById(id:any){
    const url:string = environment.getNegociosByIDNegocios+id;
    return this.httpClient.get(url);
  }
  getNegocios(){
    const url:string = environment.postNegocioNegocios; //postNegocioNegocios: "http://localhost:3000/negocios"
    return this.httpClient.get(url);
  }

  postNegocio(newNegocio:any){
    const url:string = environment.postNegocioNegocios;
    newNegocio.id_user=this.loginService.getLoggedUserID();
    console.log(newNegocio.id_user);
    return this.httpClient.post(url, newNegocio);
  }
  deleteNegocio(id:any){
    const url:string = environment.CRUDNegociosByID + id;
    return this.httpClient.delete(url);
  }

}


