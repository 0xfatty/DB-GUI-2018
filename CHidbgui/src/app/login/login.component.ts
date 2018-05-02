import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, DataSharingService } from '../_services/index';
declare var jquery: any;
declare var $: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private dataSharingService: DataSharingService,
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // After the user has logged in, emit the behavior subject changes.
        this.dataSharingService.isUserLoggedIn.next(false);
        this.dataSharingService.userType.next(2);
        this.dataSharingService.userFullname.next('');

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password).then(
            data => {
                this.loading = false;
                console.log(data);
                console.log(data.result);
                if (data.result === 1) {
                    console.log('logged in');
                    this.afterUserLogin();
                    this.router.navigate([this.returnUrl]);
                } else {
                    this.alertService.error(data.message);
                }
            },
            error => {
                console.log(error);
                this.alertService.error('There is an unknown error');
                this.loading = false;
            }
        );
    }

    afterUserLogin() {
        const curUser = this.authenticationService.getCurrentUser();

        // After the user has logged in, emit the behavior subject changes.
        this.dataSharingService.isUserLoggedIn.next(true);
        this.dataSharingService.userType.next(curUser.type);
        this.dataSharingService.userFullname.next(curUser.firstName + ' ' + curUser.lastName);
    }
}
