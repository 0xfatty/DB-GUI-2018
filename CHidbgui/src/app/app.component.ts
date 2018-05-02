import { Component } from '@angular/core';
declare var jquery:any;
declare var $ :any;

import '../assets/app.css';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
	private _opened: boolean = false;
	private _toggleSidebar() {
		this._opened = !this._opened;
	}	
 }
