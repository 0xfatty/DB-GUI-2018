import {
  Component,
  OnInit
} from '@angular/core';
// import {Restuarant} from '../../app/domain/modules/restuarant';
import {
  Restuarant
} from '../../app/domain/modules/user-Restaurant';
import {
  AccountRepostitory
} from '../../app/domain/account-info-repository.service.';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private accountRepo: AccountRepostitory) {}
  public newRestuarant: Restuarant;
  public list: Restuarant[];
  public restNum: number;
  public name: String;
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.newRestuarant = {};
    this.accountRepo.getRestuarants(localStorage.getItem('authkey')).subscribe(data => {
      this.newRestuarant = data[0];
      this.list = data;
      this.list.forEach(curr => {
        curr.desc = curr.description;
        curr.picture = curr.restIMGLink;
        curr.news = curr.restNews;
        curr.link = curr.restLink;
      });

    });


  }
  public onAddCourseClick() {
    if (!this.newRestuarant.news) {
      this.newRestuarant.news = 'None';
    }

    this.newRestuarant.desc = this.newRestuarant.description;
    this.newRestuarant.picture = this.newRestuarant.restIMGLink;
    this.newRestuarant.news = this.newRestuarant.restNews;
    this.newRestuarant.link = this.newRestuarant.restLink;
    this.accountRepo.addRest(localStorage.getItem('authKey'), this.newRestuarant);


    this.accountRepo.getRestuarants(localStorage.getItem('authkey')).subscribe(data => {

      this.list = data;
      this.list.forEach(curr => {
        curr.desc = curr.description;
        curr.picture = curr.restIMGLink;
        curr.news = curr.restNews;
        curr.link = curr.restLink;
      });
    });
    this.newRestuarant = {};

  }
  public update() {

  }

  public clear() {
    this.newRestuarant = {};
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
