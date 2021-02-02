import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth:AuthService) { }
  model :any={};

  ngOnInit() {
  }

  login(){
    this.auth.login(this.model).subscribe(
      next=>{
        console.log("تم الدخول بنجاح");
      },
      error=>{
        console.log("حدث مشكله");
      }
    )
  }


  loggedIn(){
    const token=localStorage.getItem('token');
    return !! token;
  }

  logedOut(){
    localStorage.removeItem('token');
    console.log("تم الخروج");
  }

}
