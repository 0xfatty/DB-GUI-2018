import { FormsModule } from '@angular/forms';
import { CHEF_ROUTES } from './headchef-route';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sprint2Component } from './sprint2.component';
import { MealsComponent } from './meals/meals.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CHEF_ROUTES),
    FormsModule,
  ],
  declarations: [
    Sprint2Component,
    MealsComponent,
    InventoryComponent
]
})
export class Sprint2Module { }
