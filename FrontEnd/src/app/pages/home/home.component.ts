import { Component, OnInit  } from '@angular/core';
import { io } from 'socket.io-client';

import { Publicacion } from 'src/app/shared/interfaces/publicacion';
import { PublicacionService } from 'src/app/shared/services/publicacion.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/interfaces/user';
import { Negocios } from 'src/app/shared/interfaces/negocios';
import { NegociosService } from 'src/app/shared/services/negocios.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from 'src/app/shared/components/add-comment-dialog/add-comment-dialog.component';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  posts: Array<Publicacion>= [];
  postsFiltrados: Array<Publicacion> = [];
  buscar: string='';
  comment: string='';
  socket: any;
  user: any ;
  negociosFiltrados: Array<any>=[];
  negocios: Array<any>=[];
  logged: boolean = false;
  idsNegocios : Array<any>=[];
  ids : Array<String>=[];

  constructor(
    private publicacionService:PublicacionService,
    private commentService:CommentService,
    private loginService:LogInService,
    private userService:UsersService,
    private negociosService: NegociosService,
    private socialAuthService:SocialAuthService,
    private tokenService: TokenService,
    private router: Router,
    private matDialog:MatDialog
    ){
    // this.bringPosts();
    this.filtrar();
    this.bringNegocios();
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

  // bringPosts(){
  //   this.publicacionService.getPublicacion().subscribe((response:any) =>{
  //   this.posts = response;
  //   this.postsFiltrados= this.posts;
  //   })
  // }

  bringNegocios(){
    this.negociosService.getNegocios().subscribe((response:any) =>{
      this.negocios=response;
      this.negociosFiltrados=this.negocios;
    })
    // this.userService.getUserByID(this.loginService.getLoggedUserID()).subscribe((response:any) => {
      
    //   this.negociosId=response.negociosSeguidos;
    //   console.log(this.negociosId);
    //   this.negociosId.forEach(negocio => {
    //     console.log(negocio);
    //     this.negociosService.getNegociosById(negocio).subscribe((response:any) => {
    //       console.log(response);
    //       this.negocios.push(response);
    //     });
    //   });
    //   console.log(this.negocios);
    // });
  }

  filtrar(){
    const buscar = this.buscar.toLowerCase();
    this.negociosFiltrados = this.negocios.filter(item=>{
      return item.name?.toLocaleLowerCase().includes(buscar) || item.description?.toLocaleLowerCase().includes(buscar);
    }); 
  }

  follow(negocioId: any){
    this.userService.getUserByID(this.loginService.getLoggedUserID()).subscribe((response:any) =>{
      let flag=0;
      this.idsNegocios=response.negociosSeguidos;
      this.idsNegocios.forEach(negocio => {
        this.ids.push(negocio._id);
      });
      console.log(negocioId._id);
      if(response.negociosSeguidos[0]==undefined)response.negociosSeguidos.push(negocioId._id);
      else if(this.ids.includes(negocioId._id))response.negociosSeguidos = response.negociosSeguidos.filter((item: any) => item._id !== negocioId._id);
      else response.negociosSeguidos.push(negocioId._id);
      
      console.log(response.negociosSeguidos);
      this.ids=[];
      this.userService.putUserByID(this.loginService.getLoggedUserID(), response).subscribe();
    });
  }

  ngOnInit(): void {
    this.socket = io(environment.apiUrl);
    this.socket.on(this.loginService.getLoggedUserID(), (data:any) => {
      console.log('regrso');
      alert('Alguien comentó su publicación');
    })
  }

  addComment(negocio: any){
    const element = document.getElementById("addComment2") as HTMLInputElement;
    const comment = element.value;
    console.log(negocio);
    const newComment = {
      userId: this.loginService.getLoggedUserID(),
      comment: comment,
      negocioId: negocio._id
    }
    console.log(negocio.id_user);
    this.socket.emit('newComment', negocio.id_user);
    return this.commentService.postComment(newComment).subscribe();
  }

  addCommentDialog(negocioId:any,name:any,address:any,negocio_userId:any){
    const userIdActivo = this.loginService.getLoggedUserID();
    
    let dialogRef = this.matDialog.open(AddCommentDialogComponent,
      {
        data:{
          negocioId:negocioId,
          name:name,
          address:address,
          userId:userIdActivo,
          negocio_userId:negocio_userId
        }
    });
    dialogRef.afterClosed().subscribe(
      result=>{console.log("se cerro el dialog addComment");
      }
    );
  }


}
