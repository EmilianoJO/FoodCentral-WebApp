import { Component } from '@angular/core';

import { NegociosService } from 'src/app/shared/services/negocios.service';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { User } from 'src/app/shared/interfaces/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { Negocios } from 'src/app/shared/interfaces/negocios';
import { Publicacion } from 'src/app/shared/interfaces/publicacion';
import { PublicacionService } from 'src/app/shared/services/publicacion.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';



@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.scss']
})
export class FollowedComponent {

  negociosId: Array<Negocios>=[];
  negocios: Array<Negocios>=[];
  ids: Array<any>=[];
  posts: Array<Publicacion>= [];
  postsFiltrados: Array<Publicacion> = [];
  logged: boolean = false;

  constructor(
    private negociosService: NegociosService, 
    private loginService:LogInService, 
    private userService:UsersService,
    private publicacionService:PublicacionService,
    private socialAuthService:SocialAuthService,
    private tokenService: TokenService,
    private router: Router
    ){
    this.bringPublicaciones();
    this.socialAuthService.authState.subscribe((user: SocialUser) =>{
      if(user){
        //console.log("Usuario de google: ", user);
        this.loginService.googleLogIn(user.idToken).subscribe(response => {
          this.tokenService.setToken(response.token);
          this.router.navigate(['']);
          this.logged = true;
        });
      }
    });
  }

  bringPublicaciones(){
        
    this.userService.getUserByID(this.loginService.getLoggedUserID()).subscribe((response:any) => {
      
      this.negociosId=response.negociosSeguidos;
      this.ids=response.negociosSeguidos;
      //console.log(this.negociosId);
      this.negociosId.forEach(negocio => {        
        this.negocios.push(negocio);
      });
    
        this.publicacionService.getPublicacion().subscribe((response:any) =>{
          this.posts = response;
          this.posts.forEach(post => {
            //console.log("ids: ",this.ids);
            //console.log("post.idnegocio: ",post.id_negocio);
            this.ids.forEach(elemNegocio=>{
              //console.log("cada negocio que sigo: ",elemNegocio._id);
              //console.log("cada negocio ID del post: ",post.id_negocio);
              if(elemNegocio._id ==post.id_negocio){
                this.postsFiltrados.push(post);
              }
            });
            
          });
        });
      
    });
    //console.log(this.postsFiltrados);
    
  }

  like(id_post: any, post:any){
    post.likes+=1;
    return this.publicacionService.updatePublicacion(id_post, post).subscribe();
  }

}
