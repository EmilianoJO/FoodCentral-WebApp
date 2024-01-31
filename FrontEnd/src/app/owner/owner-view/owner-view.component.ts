import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { BusinessOperationsService } from 'src/app/shared/services/business-operations.service';
import { Router } from '@angular/router';
import { PostsServiceService } from 'src/app/shared/services/posts-service.service';
import { CommentsServiceService } from 'src/app/shared/services/comments-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from 'src/app/shared/services/token.service';


import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-owner-view',
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.scss']
})
export class OwnerViewComponent{

  private helper = new JwtHelperService();
  businesses:any[] = [];
  socket: any;


  constructor(private route:ActivatedRoute, 
    private logInService:LogInService,
    private userService: UsersService,
    private businessOperationsService: BusinessOperationsService,
    private router: Router,
    private postService: PostsServiceService,
    private commentsService: CommentsServiceService,
    private tokenService: TokenService){
    const decodedToken = this.helper.decodeToken(this.tokenService.getToken());
    console.log("decoded token:");
    console.log(decodedToken);
    let tokenID = decodedToken.id;
    this.logInService.setLoggedUserID(tokenID);
    let ID:string = this.logInService.getLoggedUserID(); 
    this.userService.getUserByID(ID).subscribe((response:any)=>{
      console.log("Se ha extraido el usuarios correctamente");
      this.businesses = response.negocios;
    });
  }

  editBusiness(id:string){
    localStorage.setItem('businessID', id);
    this.businessOperationsService.setSelectedBusinessID(id);
    this.router.navigate(['/Edit-Business-Form']);
  }

  deleteBusiness(id: string){
    this.businessOperationsService.deleteBusinessByID(id).subscribe((response:any)=>{
      console.log(response);
      this.businesses = [];
      let ID:string = this.logInService.getLoggedUserID(); 
      this.userService.getUserByID(ID).subscribe((response2:any)=>{
        this.businesses = response2.negocios;
      })
    });
  }

  goToCommentsPage(id: string){
    localStorage.setItem('businessID', id);
    this.postService.setTargetBusinessID(id);
    this.router.navigate(['/Post-Form']);
  }

  seeComments(id: string){
    console.log(id);
    localStorage.setItem('businessID', id);
    this.commentsService.setNegocioID(id);
    this.router.navigate(['Comments-View']);
  }

  ngOnInit(): void {
    this.socket = io(environment.apiUrl);
    this.socket.on(this.logInService.getLoggedUserID(), (data:any) => {
      console.log('regrso');
      alert('Alguien comentó su publicación');
    })
  }

}
