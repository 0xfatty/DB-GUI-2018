import { MealsComponent } from './meals/meals.component';

import { Route } from '@angular/router';
import { Component } from '@angular/core';
import { InventoryComponent } from './inventory/inventory.component';


export const CHEF_ROUTES: Route[] = [
  {
    path: 'sprint2/inventory',
    component: InventoryComponent,
  },
  {
    path: 'sprint2/meals',
    component: MealsComponent,
  }
];
