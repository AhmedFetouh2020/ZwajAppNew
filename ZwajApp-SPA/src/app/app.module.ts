import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { AppComponent } from './app.component';
import  {HttpClientModule} from '@angular/common/http'
import { NavComponent } from './Nav/Nav.component';
import {FormsModule} from '@angular/forms'
import { AuthService } from './_Services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_Services/error.interceptor';
import { AlertifyServeiceService } from './_Services/AlertifyServeice.service';
@NgModule({
  declarations: [				
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
  ErrorInterceptorProvider,
  AlertifyServeiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
