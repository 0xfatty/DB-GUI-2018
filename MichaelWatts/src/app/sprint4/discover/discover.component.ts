import { Component, OnInit } from '@angular/core';
import { AccountRepostitory } from '../../domain/account-info-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restuarant } from '../../domain/modules/user-Restaurant';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  public id: string;
  public name: string;
  public search: any;
  public myRestaurant: Restuarant;
  public restuarants: Restuarant[];
  constructor(private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // gets user info
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('authkey');
    console.log(this.id);
  this.myRestaurant = new Restuarant();
  }
  public setRestaurant(r) {
    // gets selected resturant object
    this.myRestaurant = r;
  }
  public save() {
    // saves resturant in user criteria
    console.log(this.myRestaurant);
    this.accountRepo.addRest(this.id, this.myRestaurant).subscribe(data => {
      console.log(data);
    });
  }

  public citySearch() {
    // searches database by city for resturants to present to user and saves them in array
    this.accountRepo.getRestCity(this.search).subscribe(data => {
      this.restuarants = data;
    });
  }
  public zipSearch() {
    // searches database by zipcode for resturants to present to user and saves them in array
    this.accountRepo.getRestZip(this.search).subscribe(data => {

      this.restuarants = data;
    });
  }
}
