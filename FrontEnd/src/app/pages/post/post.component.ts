import { Component } from '@angular/core';
import { io } from 'socket.io-client';

import { PublicacionService } from 'src/app/shared/services/publicacion.service';
import { Publicacion } from 'src/app/shared/interfaces/publicacion';
import { NegociosService } from 'src/app/shared/services/negocios.service';
import { LogInService } from 'src/app/shared/services/log-in.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  publicaciones: Array<Publicacion> = [];
  title: String='';
  url: String='';
  description: String='';
  nn:any;
  socket: any;

  constructor(private publicacionService:PublicacionService, private negocioService:NegociosService, private loginService:LogInService){
    this.bringPublicaion();
  }
  bringPublicaion(){
      this.publicacionService.getPublicacion().subscribe((response:any) =>{
      this.publicaciones = response;
    })
  }

  // nuevoNegocio(){
  //   return this.negocioService.postNegocio({
  //     name: this.title
  //   }).subscribe((response:any)=>{
  //     this.nn = response;
  //     console.log(this.nn._id);
  //   });
  // }   

  crear(){
    //this.nuevoNegocio();
    return this.publicacionService.createPublicacion({
      title: this.title,
      url: this.url,
      description: this.description,
      id_negocio: '641a5867156bc7d9d450d486',
      id_user: this.loginService.getLoggedUserID()
    }).subscribe();
  }
}
