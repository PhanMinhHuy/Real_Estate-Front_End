import { ErrorComponent } from './components/error/error.component';
import { VerifyComponent } from './../auth/verify/verify.component';
import { RegistrationComponent } from './../auth/registration/registration.component';
import { LoginComponent } from './../auth/login/login.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from '../user/user.component';
import { PostEditComponent } from '../user/components/post-edit/post-edit.component';

import { ListAllComponent } from './components/list-posts/list-all/list-all.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { PostConfirmComponent } from './components/post/post-confirm/post-confirm.component';
import { PostDetailComponent } from './components/list-posts/post-detail/post-detail.component';
import { SupportComponent } from '../support/support.component';
import { UserInfoEditComponent } from '../user/components/user-info-edit/user-info-edit.component';
import { PasswordEditComponent } from '../user/components/password-edit/password-edit.component';
import { LoginAdminComponent } from '../admin/components/login-admin/login-admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'verify', component: VerifyComponent },
      { path: 'user', component: UserComponent },
      {
        path: 'update',
        children: [
          { path: 'profile', component: UserInfoEditComponent },
          { path: 'password', component: PasswordEditComponent },
        ],
      },
      // {path: 'user-info-edit/:id', component: UserInfoEditComponent},
      // {path: 'password-edit/:id', component: PasswordEditComponent},
      { path: 'post-edit/:id', component: PostEditComponent },
      { path: '', component: ListAllComponent },
      { path: 'post-detail/:id', component: PostDetailComponent },
      { path: 'post-form', component: PostFormComponent },
      { path: 'post-confirm', component: PostConfirmComponent },
      { path: 'support', component: SupportComponent },
      { path: 'login-admin', component: LoginAdminComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
