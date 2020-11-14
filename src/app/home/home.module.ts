import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostDetailComponent } from './components/list-posts/post-detail/post-detail.component';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { SearchByAgeComponent } from './components/search-by-age/search-by-age.component';
import { SearchByKeywordComponent } from './components/search-by-keyword/search-by-keyword.component';
import { ListAllComponent } from './components/list-posts/list-all/list-all.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { PostConfirmComponent } from './components/post/post-confirm/post-confirm.component';
import { UserModule } from '../user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminModule } from '../admin/admin.module';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from './components/error/error.component';
import { SupportComponent } from './components/support/support.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostDetailComponent,
    AdvanceSearchComponent,
    SearchByAgeComponent,
    SearchByKeywordComponent,
    ListAllComponent,
    PostFormComponent,
    PostConfirmComponent,
    ErrorComponent,
    SupportComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AdminModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgbProgressbarModule,
  ],
  exports: [ErrorComponent],
})
export class HomeModule {}
