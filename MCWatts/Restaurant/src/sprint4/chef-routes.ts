import { DiscoverComponent } from './discover/discover.component';
import { CalenderComponent } from './calender/calender.component';


import { Route } from '@angular/router';
import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';



export const CHEF_ROUTES: Route[] = [
  {
    path: 'sprint4/calendar/:id',
    component: CalenderComponent,
    pathMatch: 'full'
  },
  {
    path: 'sprint4/search/:id',
    component: SearchComponent,
    pathMatch: 'full'
  },
  {
    path: 'sprint4/discover/:id',
    component: DiscoverComponent,
    pathMatch: 'full'
  },
];
