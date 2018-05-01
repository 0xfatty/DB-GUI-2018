import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit(): void {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
