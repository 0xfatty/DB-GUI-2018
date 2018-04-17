import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sprint3Component } from './sprint3.component';
import { MyRestaurantComponent } from './myRestaurant/myRestaurant.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { USER_ROUTES } from './user-route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES),
    FormsModule,
  ],
  declarations: [Sprint3Component,
    MyRestaurantComponent
]
})
export class Sprint3Module { }
