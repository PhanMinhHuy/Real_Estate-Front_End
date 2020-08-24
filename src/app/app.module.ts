import {AuthModule} from './auth/auth.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SupportComponent} from './support/support.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FormDirective} from './directives/form.directive';

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
  providers: [],
  bootstrap: [AppComponent],
  exports: [FormDirective]
})
export class AppModule {
}
