import { Review } from './../../app/domain/modules/review';
import { Meal } from './../../app/domain/modules/meal';
import { FoodGroup } from './../../app/domain/modules/foodGroup';
import { Restuarant } from './../../app/domain/modules/user-Restaurant';

import { User } from './../../app/domain/modules/user';
 import { AccountRepostitory } from './../../app/domain/account-info-repository.service.';
import { Component, OnInit } from '@angular/core';
import { Food } from '../../app/domain/modules/food';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
     private accountRepo: AccountRepostitory
  ) { }
  user: User;
  loggedIn: User;

  ngOnInit() {
    this.user = {};


  }
  public onClickLogin() {


    this.accountRepo.check(this.user).subscribe(data => {
      console.log(data);
      if (data.reply) {
       alert(data);
     } else {
       this.loggedIn = data;
        localStorage.setItem('User', data.username);
        localStorage.setItem('name', (data.fName + ' ' + data.lName));
        localStorage.setItem('authKey', data.idaccount);
     }
    });
    this.user = {};
  }
}
