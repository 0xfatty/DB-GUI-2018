import { Restuarant } from './../../app/domain/modules/user-Restaurant';
import { Component, OnInit } from '@angular/core';
import { AccountRepostitory } from '../../app/domain/account-info-repository.service.';

@Component({

  templateUrl: './myRestaurant.component.html',
  styleUrls: ['./myRestaurant.component.css']
})
export class MyRestaurantComponent implements OnInit {
  public myRestaurant: Restuarant;
  public restuarants: Restuarant[];
  constructor(private accountRepo: AccountRepostitory) { }
  public id: string;
  public name: string;
  ngOnInit() {
    this.id = localStorage.getItem('authKey');
    this.name = localStorage.getItem('name');
    this.accountRepo.getRestuarants(this.id).subscribe(data => {
      this.restuarants = data;
    });
    this.myRestaurant = new Restuarant();
  }
  public setRestaurant(r) {
    this.myRestaurant = r;
  }

}
