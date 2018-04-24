import { CalenderComponent } from './calender/calender.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sprint4Component } from './sprint4.component';

import { RouterModule } from '@angular/router';
import { CHEF_ROUTES } from '../sprint4/chef-routes';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { DiscoverComponent } from './discover/discover.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CHEF_ROUTES),
    FormsModule,
  ],
  declarations: [
    Sprint4Component,

    CalenderComponent,
    SearchComponent,
    DiscoverComponent
],
exports: [CalenderComponent],
})
export class Sprint4Module { }
