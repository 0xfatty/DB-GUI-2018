import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models';
import { AlertService, UserService, DataSharingService } from '../../_services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // Define a variable to use for showing/hiding the Login button
  // isUserLoggedIn: boolean;
  currentUser: User;
  userType: number;
  fullname: string;
  wasLoggedIn = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private dataSharingService: DataSharingService,
  ) {
    // Subscribe here, this will automatically update 
    // "isUserLoggedIn" whenever a change to the subject is made.
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.wasLoggedIn = value;
    });

    this.dataSharingService.userType.subscribe(value => {
      this.userType = value;
    });

    this.dataSharingService.userFullname.subscribe(value => {
      this.fullname = value;
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null && this.currentUser !== undefined) {
      this.userType = this.currentUser.type;
      this.wasLoggedIn = true;
      this.fullname = (this.currentUser.firstName + ' ' + this.currentUser.lastName);
    }
  }

}
