import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentsServiceService } from 'src/app/shared/services/comments-service.service'; 
import { ResponseService } from 'src/app/shared/services/response.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.scss']
})

export class CommentsViewComponent implements OnInit{

  comments: any = [];

  constructor(private httpClient: HttpClient,
    private commentsService: CommentsServiceService,
    private router: Router,
    private responseService: ResponseService) {
      let businessID:any = localStorage.getItem('businessID');
      this.commentsService.setNegocioID(businessID);
    }

  ngOnInit(): void {
    let ID:string = this.commentsService.getNegocioID();
    this.commentsService.getCommentsFromBusinessId(ID).subscribe((response =>{
      console.log(response);
      this.comments = response;
    }));
  }

  openConfirmDialog(id: string, response: string): void {
    this.commentsService.setComentarioID(id);
    this.responseService.setCurrentResponse(response);
    this.router.navigate(['/Response-Form']);
  }

  goBack(){
    this.router.navigate(['/Owner-View'])
  }
}