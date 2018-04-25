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
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router) {}
  public newRestuarant: Restuarant;
  public list: Restuarant[];
  public restNum: number;
  public name: String;
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.newRestuarant = {};

    this.accountRepo.getRestuarants(localStorage.getItem('authkey')).subscribe(data => {

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
    console.log('here');
    // this.newRestuarant.desc = this.newRestuarant.description;
    // this.newRestuarant.picture = this.newRestuarant.restIMGLink;
    // this.newRestuarant.news = this.newRestuarant.restNews;
    // this.newRestuarant.link = this.newRestuarant.restLink;

    // this.newRestuarant = this.list[0];
    // console.log(this.newRestuarant);
    // this.newRestuarant.restName = "AHHH";
    console.log(this.newRestuarant);
    this.accountRepo.addChefResturant(localStorage.getItem('authkey'), this.newRestuarant).subscribe(d => {


    this.accountRepo.getRestuarants(localStorage.getItem('authkey')).subscribe(data => {
      console.log(data);
      this.list = data;
      this.list.forEach(curr => {
        curr.desc = curr.description;
        curr.picture = curr.restIMGLink;
        curr.news = curr.restNews;
        curr.link = curr.restLink;
      });
    });
    this.newRestuarant = {};
  });
  }
  public update() {
    this.accountRepo.updateRest(this.newRestuarant.idrestaurant, this.newRestuarant).subscribe(data =>{
      console.log(this.newRestuarant.idrestaurant);
      this.accountRepo.getRestuarants(localStorage.getItem('authkey')).subscribe(data2 => {

        this.list = data2;
        this.list.forEach(curr => {
          curr.desc = curr.description;
          curr.picture = curr.restIMGLink;
          curr.news = curr.restNews;
          curr.link = curr.restLink;
        });
      });
      this.newRestuarant = {};
    });
  }

  public clear() {
    this.newRestuarant = {};
  }
  public deleteR(r) {
    console.log('here');
    this.newRestuarant = r;
    this.accountRepo.deleteRest(r.idrestaurant, this.newRestuarant).subscribe(data => {
      console.log('here2');
      this.accountRepo.getRestuarants(localStorage.getItem('authkey')).subscribe(data2 => {
        console.log('here3');
        this.list = data2;
        this.list.forEach(curr => {
          curr.desc = curr.description;
          curr.picture = curr.restIMGLink;
          curr.news = curr.restNews;
          curr.link = curr.restLink;
        });
      });
      this.newRestuarant = {};
    });
  }
  public save(r) {
    this.newRestuarant = r;
  }

}
