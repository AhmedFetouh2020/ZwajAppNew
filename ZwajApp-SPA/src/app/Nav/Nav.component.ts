import { Component, OnInit } from '@angular/core';
import { AlertifyServeiceService } from '../_Services/AlertifyServeice.service';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public auth:AuthService , private alertify:AlertifyServeiceService) { }
  model :any={};

  ngOnInit() {
  }

  login(){
    this.auth.login(this.model).subscribe(
      next=>{
        this.alertify.success("تمت عملية الدخول بنجاح");
      },
      error=>{
        this.alertify.error("فشلت عملية الدخول ");
      }
    )
  }


  loggedIn(){
    return this.auth.loggedIn();
  }

  logedOut(){
    localStorage.removeItem('token');
    this.alertify.warning("تم الخروج ");
  }

}
