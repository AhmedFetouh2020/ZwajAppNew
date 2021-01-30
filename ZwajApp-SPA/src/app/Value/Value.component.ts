import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {


  value:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues(){
    this.http.get('https://localhost:5001/api/value').subscribe(
      response=>{
        this.value=response;
      },
      error=>{
        console.log(error);
      }
      
    )
  }

}
