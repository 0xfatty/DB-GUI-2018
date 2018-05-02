import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../_models';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

  @Input() menus: Menu[];
  // tslint:disable-next-line:no-inferrable-types
  @Input() restaurantId: number = 0;
  // holds array with resturants menu and number with resturantID
  constructor() { }

  ngOnInit() {
  }

}
