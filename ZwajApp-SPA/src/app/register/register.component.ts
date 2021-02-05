import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyServeiceService } from '../_Services/AlertifyServeice.service';
import { AuthService } from '../_Services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private authService:AuthService , private alertify:AlertifyServeiceService) { }

  ngOnInit() {
  }
  register() {
   this.authService.register(this.model).subscribe(
     ()=>{
       this.alertify.success(" تم الاشتراك بنجاح");
       
     },
     error=>{
      this.alertify.error(error);
     }
   );
  }
  cancel() {
    console.log('ليس الأن');
    this.cancelRegister.emit(true);
  }

 @Input() ValuesFromRegister:any;

 @Output() cancelRegister=new EventEmitter();
}
