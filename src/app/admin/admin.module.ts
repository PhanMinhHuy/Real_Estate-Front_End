import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';
import { ViewCountStatisticComponent } from './components/statistic/view-count-statistic/view-count-statistic.component';
import { MostViewCountStatisticComponent } from './components/statistic/most-view-count-statistic/most-view-count-statistic.component';
import { ChartsModule } from 'ng2-charts';
import { PendingPostListComponent } from './components/post/pending-post-list/pending-post-list.component';
import { ApprovedPostListComponent } from './components/post/approved-post-list/approved-post-list.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { InfoComponent } from './components/info/info.component';
import { SupportListComponent } from './components/support-list/support-list.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingComponent } from './components/setting/setting.component';
import { CategoryManagementComponent } from './components/setting/category-management/category-management.component';
import { PostTypeManagementComponent } from './components/setting/post-type-management/post-type-management.component';
import { RegionManagementComponent } from './components/setting/region-management/region-management.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
    SideBarComponent,
    UserListComponent,
    UserDetailComponent,
    LoginAdminComponent,
    PostDetailComponent,
    ViewCountStatisticComponent,
    MostViewCountStatisticComponent,
    SupportListComponent,
    SettingComponent,
    PendingPostListComponent,
    ApprovedPostListComponent,
    AuthorizationComponent,
    InfoComponent,
    CategoryManagementComponent,
    PostTypeManagementComponent,
    RegionManagementComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    ChartsModule,
    FormsModule,
  ],
  exports: [LoginAdminComponent],
})
export class AdminModule {}
