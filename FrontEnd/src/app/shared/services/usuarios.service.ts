import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient:HttpClient) { }
  
  getUsuariosById(id:any){
    const url:string = environment.getUsuarioByIDUsuario+id;
    return this.httpClient.get(url);
  }
  getUsuarios(){
    const url:string = environment.getUsuarios;
    return this.httpClient.get(url);
  }

  deleteUsuario(id:any){
    const url:string = environment.getUsuarioByIDUsuario + id;
    return this.httpClient.delete(url);
  }
}
