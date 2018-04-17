import { Component, OnInit } from '@angular/core';
import {Restuarant} from '../../app/domain/modules/restuarant';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }
public newRestuarant: Restuarant;
public list: Restuarant[];
public restNum: number;
  ngOnInit() {
    this.list = [];
    this.restNum = 0;
    this.newRestuarant = {};
  }
public onAddCourseClick() {
    if (this.newRestuarant.position === undefined) {
    this.newRestuarant.position = this.restNum;
    this.list.push(this.newRestuarant);
    this.restNum++;
    } else {
      this.list[this.newRestuarant.position] = this.newRestuarant;
    }

    this.newRestuarant = {};

    console.log(this.list);


}
public deleteR(r) {
  for (let i = 0; i < this.list.length; i++) {
    if (this.list[i] === r) {
      this.list.splice(i, 1);
      this.restNum--;
    }
  }
}
public save(r) {
  this.newRestuarant = r;
}

}
