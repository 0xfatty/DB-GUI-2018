import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  user: User;
  ngOnInit() {
    this.user = {};
  }
  public onClickLogin() {
     // $.get("aea05d46-7ee9-444d-b40d-df6a11c81d2b.mock.pstmn.io/Account", function(data){
        //    var obj = JSON.parse(data);
        //    if (obj.response == "true"){
          alert('Welcome ' + this.user.username);
          //    }
          // })
    this.user = {};
  }
}