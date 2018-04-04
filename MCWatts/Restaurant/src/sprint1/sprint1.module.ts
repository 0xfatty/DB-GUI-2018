import { OWNER_ROUTES } from './owner-routes';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sprint1Component } from './sprint1.component';
import { LoginComponent } from './Login/Login.component';
import { TableComponent } from './Table/Table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(OWNER_ROUTES),
  ],
  declarations: [
    Sprint1Component,
    LoginComponent,
    TableComponent
],
exports: [
  LoginComponent,
  TableComponent,
  Sprint1Component,
],
})
export class Sprint1Module { }
