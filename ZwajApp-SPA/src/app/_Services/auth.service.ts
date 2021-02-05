import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decode } from 'punycode';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  jwtHelber = new JwtHelperService();


baseurl="http://localhost:5000/api/auth/";

decodedToken:any;

constructor(private http:HttpClient) { }

login(model:any){
  return this.http.post(this.baseurl+'login',model).pipe(
    map((response:any)=>{
      const user=response;
      if(user){localStorage.setItem('token',user.token);
    
    this.decodedToken=this.jwtHelber.decodeToken(user.token);
      console.log(this.decodedToken);
  }
    })
  );
}


  register(model:any){
    return this.http.post(this.baseurl+"register",model);
  }



  loggedIn()
  {
    try{
      const token=localStorage.getItem('token');
      return ! this.jwtHelber.isTokenExpired(token);
    }
     catch{
       return false;
     }
  }
}

