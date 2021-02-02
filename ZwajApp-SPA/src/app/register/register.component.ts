import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_Services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  register() {
   this.authService.register(this.model).subscribe(
     ()=>{
        console.log(" تم الاشتراك بنجاح");
     },
     error=>{
      console.log(error);
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
