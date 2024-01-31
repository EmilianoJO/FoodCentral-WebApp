import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
  SocialLoginModule, 
  SocialAuthServiceConfig, 
  GoogleLoginProvider, 
  GoogleSigninButtonModule 
} from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { MaterialModule } from './material/material.module';
import { SignInComponent } from './forms/sign-in/sign-in.component';
import { OwnerViewComponent } from './owner/owner-view/owner-view.component';
import { NewBusinessFormComponent } from './forms/new-business-form/new-business-form.component';
import { EditBusinessComponent } from './forms/edit-business/edit-business.component';
import { PostFormComponent } from './forms/post-form/post-form.component';
import { CommentsViewComponent } from './comments/comments-view/comments-view.component';
import { ResponseFormComponent } from './forms/response-form/response-form.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';

//import { MaterialModule } from './modules/material/material.module';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { EditCommentDialogComponent } from './shared/components/edit-comment-dialog/edit-comment-dialog.component';
import { DeleteCommentDialogComponent } from './shared/components/delete-comment-dialog/delete-comment-dialog.component';

import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { FollowedComponent } from './pages/followed/followed.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { DeleteUserDialogComponent } from './shared/components/delete-user-dialog/delete-user-dialog.component';
import { DeleteBusinessDialogComponent } from './shared/components/delete-business-dialog/delete-business-dialog.component';

import { environment } from 'src/environments/environment';
import { AddCommentDialogComponent } from './shared/components/add-comment-dialog/add-comment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    OwnerViewComponent,
    NewBusinessFormComponent,
    EditBusinessComponent,
    PostFormComponent,
    CommentsViewComponent,
    ResponseFormComponent,
    NavComponent,
    FooterComponent,
    ReviewsComponent,
    EditCommentDialogComponent,
    DeleteCommentDialogComponent,
    HomeComponent,
    PostComponent,
    FollowedComponent,
    AdminViewComponent,
    DeleteUserDialogComponent,
    DeleteBusinessDialogComponent,
    AddCommentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "264879683267-spjp2jpn7vqorbodu9n6s7mjgf24rn7l.apps.googleusercontent.com"
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
