
import { MealsComponent } from './meals/meals.component';

import { Route } from '@angular/router';
import { Component } from '@angular/core';
import { InventoryComponent } from './inventory/inventory.component';


export const CHEF_ROUTES: Route[] = [
  {
    path: 'inventory/:restID',
    component: InventoryComponent,
  },
  {
    path: 'meals/:restID',
    component: MealsComponent,
  }
];
