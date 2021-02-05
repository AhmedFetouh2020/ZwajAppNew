import { Component,OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 

jwtHelper= new JwtHelperService();


constructor(public auth:AuthService) {
}
  ngOnInit() {
    const token=localStorage.getItem('token');
    this.auth.decodedToken=this.jwtHelper.decodeToken(token);

  }
  title = 'app 55';
}
