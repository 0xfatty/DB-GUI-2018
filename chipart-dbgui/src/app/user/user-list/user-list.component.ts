import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/';
import { AlertService, UserService } from '../../_services';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  selectedUser: any = -1;
  inEditMode: any = false;
  model: any = {};
  loading = false;
  toDeleteUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }


  enableAddingForm(show: any) {
    this.inEditMode = false;
    $('#exampleModal').modal('show');
  }

  confirmToDelete(item: User) {
    this.toDeleteUser = item;
    $('#deleteConfirmDlg').modal('show');
  }

  deleteUser() {
    const id = this.toDeleteUser.id;
    this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
  }
  editUser(userId: any) {
    this.selectedUser = userId;
    this.inEditMode = true;

    this.userService.getById(userId).then(
      data => {
        this.loading = false;
        this.model = data;
        $('#exampleModal').modal('show');
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  addNewUser() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('User was added successfully', true);
          this.loading = false;
          $('#exampleModal').modal('hide');
          this.loadAllUsers();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  updateUser() {
    this.model.id = this.selectedUser;
    this.userService.update(this.model)
      .subscribe(
        data => {
          this.alertService.success('User was updated successfully', true);
          this.loadAllUsers();
          this.loading = false;
          $('#exampleModal').modal('hide');
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  private loadAllUsers() {
    this.userService.getAll().then(
      users => {
        this.users = users;
      },
      error => {
        this.alertService.error('Error in loading user list', true);
      });
  }
}
