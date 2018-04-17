import { MyRestaurantComponent } from './myRestaurant/myRestaurant.component';


import { Route } from '@angular/router';
import { Component } from '@angular/core';


export const USER_ROUTES: Route[] = [
  {
    path: 'sprint3/userRestaurants',
    component: MyRestaurantComponent,
  },
];
