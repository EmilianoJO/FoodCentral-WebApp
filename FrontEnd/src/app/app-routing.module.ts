import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';

import { ReviewsComponent } from './pages/reviews/reviews.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { SignInComponent } from './forms/sign-in/sign-in.component';
import { OwnerViewComponent } from './owner/owner-view/owner-view.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NewBusinessFormComponent } from './forms/new-business-form/new-business-form.component';
import { EditBusinessComponent } from './forms/edit-business/edit-business.component';
import { PostFormComponent } from './forms/post-form/post-form.component';
import { CommentsViewComponent } from './comments/comments-view/comments-view.component';
import { ResponseFormComponent } from './forms/response-form/response-form.component';
import { FollowedComponent } from './pages/followed/followed.component';
import { AuthGuardOwnerGuard } from './shared/guards/auth-guard-owner.guard';
import { AuthGuardNormalUserGuard } from './shared/guards/auth-guard-normal-user.guard';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { AuthGuardSuperUserGuard } from './shared/guards/auth-guard-super-user.guard';

const routes: Routes = [];


@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'Sign-Up-Menu', component: SignUpComponent},
    {path: 'Sign-In-Menu', component: SignInComponent},

    {path: 'Owner-View', component: OwnerViewComponent, canActivate: [AuthGuard,AuthGuardOwnerGuard]},
    {path: 'Business-Form', component: NewBusinessFormComponent, canActivate: [AuthGuard, AuthGuardOwnerGuard]},
    {path: 'Edit-Business-Form', component: EditBusinessComponent, canActivate: [AuthGuard, AuthGuardOwnerGuard]},
    {path: 'Post-Form', component: PostFormComponent, canActivate: [AuthGuard, AuthGuardOwnerGuard]},
    {path: 'Comments-View', component: CommentsViewComponent, canActivate: [AuthGuard, AuthGuardOwnerGuard]},
    {path: 'Response-Form', component: ResponseFormComponent, canActivate: [AuthGuard, AuthGuardOwnerGuard]},  
    {path: 'reviews', component:ReviewsComponent, canActivate: [AuthGuard, AuthGuardNormalUserGuard]},
    {path: '', component: HomeComponent, canActivate: [AuthGuard, AuthGuardNormalUserGuard]},
    {path: 'followed', component: FollowedComponent, canActivate: [AuthGuard, AuthGuardNormalUserGuard]},
    {path: 'post', component: PostComponent, canActivate: [AuthGuard, AuthGuardNormalUserGuard]},
    {path: 'admin-view', component: AdminViewComponent, canActivate: [AuthGuard, AuthGuardSuperUserGuard]}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }  
