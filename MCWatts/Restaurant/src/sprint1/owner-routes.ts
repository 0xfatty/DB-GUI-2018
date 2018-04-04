import { TableComponent } from './Table/Table.component';
import { Route } from '@angular/router';
import { Component } from '@angular/core';
import { LoginComponent } from './Login/Login.component';

export const OWNER_ROUTES: Route[] = [
  {
    path: 'sprint1/Login',
    component: LoginComponent
  },
  {
    path: 'sprint1/Table',
    component: TableComponent
  }
];
