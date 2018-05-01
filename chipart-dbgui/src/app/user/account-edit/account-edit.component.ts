import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, UserTypes } from '../../_models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService, AlertService } from '../../_services';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  @Input() inputUserId: number;

  userId: number;
  // tslint:disable-next-line:no-inferrable-types
  loading: boolean = false;
  model: any = null;
  // tslint:disable-next-line:no-inferrable-types
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private alertService: AlertService,
  ) {

  }

  ngOnInit() {
    this.getUser();
    // isAdmin = true;
  }

  getUser(): void {
    if (this.inputUserId === undefined || this.inputUserId === null) {
      this.userId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.userId = this.inputUserId;
    }

    this.userService.getById(this.userId).then(
      data => {
        console.log(data);
        this.model = data;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  updateUser() {
    this.loading = true;
    this.model.id = this.userId;
    this.userService.update(this.model)
      .subscribe(
        data => {
          this.alertService.success('User was updated successfully', true);
          this.loading = false;
          // re-sync updated information
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
