import { Component, OnInit } from '@angular/core';
import { AuthenticationService, DataSharingService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userId: number;

  constructor(private router: Router,
    private authenService: AuthenticationService,
    private dataSharingService: DataSharingService,
  ) { }

  ngOnInit() {
    const curUser = this.authenService.getCurrentUser();
    if (curUser != null && curUser !== undefined && curUser.id !== undefined) {
      this.userId = curUser.id;
    } else {
      this.router.navigate(['/']);
    }
  }

}
