import { Restuarant } from './../../app/domain/modules/user-Restaurant';
import { Component, OnInit } from '@angular/core';

@Component({

  templateUrl: './myRestaurant.component.html',
  styleUrls: ['./myRestaurant.component.css']
})
export class MyRestaurantComponent implements OnInit {
  public myRestaurant: Restuarant;
  public restuarants: Restuarant[];
  constructor() { }

  ngOnInit() {
    this.myRestaurant = {};
    this.restuarants = [];
    // tslint:disable-next-line:max-line-length
    this.restuarants.push(new Restuarant('Italian Place', 'Italian', 'Italy', 'A dummy description of the resturant', 'https://hips.hearstapps.com/del.h-cdn.co/assets/17/39/2048x1365/gallery-1506456062-delish-spaghetti-meatballs.jpg?resize=768:*', 'google.com', 'There is no news to display'));
    // tslint:disable-next-line:max-line-length
    this.restuarants.push(new Restuarant('Mexican Place', 'Mexican', 'Mexico', 'A dummy description of the resturant', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Burrito_with_rice.jpg/250px-Burrito_with_rice.jpg', 'google.com', 'There is no news to display'));
    // tslint:disable-next-line:max-line-length
    this.restuarants.push(new Restuarant('Burger Place', 'American', 'US of A Baby', 'A dummy description of the resturant', 'https://www.redrobin.com/content/dam/web/menu/tavern-menu/tavern-double-burger-1100.jpg', 'google.com', 'There is no news to display'));
   // tslint:disable-next-line:max-line-length
    this.restuarants.push(new Restuarant('Indian Place', 'Indian', 'India', 'A dummy description of the resturant', 'https://fthmb.tqn.com/2pECzYZYGKApBX-Ev143WR4UVrQ=/4896x3264/filters:fill(auto,1)/indian-breakfast-in-goa-511910426-584ece7f3df78c491ee72616.jpg', 'google.com', 'There is no news to display'));
   // tslint:disable-next-line:max-line-length
    this.restuarants.push(new Restuarant('Steakhouse', 'American', 'USA', 'A dummy description of the resturant', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/1/2/0/valentines_steak.jpg.rend.hgtvcom.616.462.suffix/1385127027449.jpeg', 'google.com', 'There is no news to display'));
   // tslint:disable-next-line:max-line-length
    this.restuarants.push(new Restuarant('Sushi', 'Japan', 'Japanese', 'A dummy description of the resturant', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Norwegia_Roll_Salmon_Sushi.jpg/220px-Norwegia_Roll_Salmon_Sushi.jpg', 'google.com', 'There is no news to display'));

  }
  public setRestaurant(r) {
    this.myRestaurant = r;
  }

}
