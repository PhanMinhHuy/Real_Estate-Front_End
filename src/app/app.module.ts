import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupportComponent } from './support/support.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDirective } from './directives/form.directive';
import { AuthInterceptor } from './helpers/auth.interceptor';

@NgModule({
  declarations: [AppComponent, SupportComponent, FormDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [FormDirective],
})
export class AppModule {}
