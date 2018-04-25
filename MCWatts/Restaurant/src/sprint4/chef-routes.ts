import { DiscoverComponent } from './discover/discover.component';
import { CalenderComponent } from './calender/calender.component';


import { Route } from '@angular/router';
import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';



export const CHEF_R: Route[] = [
  {
    path: 'calendar/:id',
    component: CalenderComponent,
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent,
    pathMatch: 'full'
  },
  {
    path: 'discover',
    component: DiscoverComponent,
    pathMatch: 'full'
  },
];
