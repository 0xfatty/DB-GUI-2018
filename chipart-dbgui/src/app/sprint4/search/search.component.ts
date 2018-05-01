import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../domain/account-info-repository.service';
import { Restuarant } from '../../domain/modules/user-Restaurant';
import { AuthenticationService, RestaurantService, AlertService } from '../../_services';
import { Restaurant } from '../../_models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  curUser: any;
  public search: any;
  // public myRestaurant: Restuarant;
  // public restuarants: Restuarant[];
  public restaurants: Restaurant[];
  public id: string;
  public name: string;

  constructor(
    private accountRepo: AccountRepostitory,
    private authenService: AuthenticationService,
    private activedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.curUser = this.authenService.getCurrentUser();

    this.name = this.curUser.username;
    this.id = this.curUser.id;
    // this.myRestaurant = new Restuarant();
  }
  // public setRestaurant(r) {
  //   this.myRestaurant = r;
  // }

  // public save() {
  //   console.log(this.myRestaurant);
  //   this.accountRepo.addRest(this.id, this.myRestaurant).subscribe(data => {
  //     console.log(data);
  //   });
  // }
  public searchForRestaurant() {
    this.restaurantService.searchRestaurants(this.search, this.curUser.id).then(data => {
      this.restaurants = data;
      for (let i = 0; i < this.restaurants.length; i++) {
        this.restaurants[i].imageName = this.restaurantService.getImageFromBlob(this.restaurants[i].imageName);
      }
      console.log(this.restaurants);

    }).catch(error => {
      console.log(error);
      this.alertService.error('Error in searching');
    });
  }

  // public citySearch() {
  //   this.accountRepo.getRestCity(this.search).subscribe(data => {
  //     this.restuarants = data;
  //   });
  // }
  // public zipSearch() {
  //   this.accountRepo.getRestZip(this.search).subscribe(data => {
  //     this.restuarants = data;
  //   });
  // }
  // public nameSearch() {
  //   this.accountRepo.getRestName(this.search).subscribe(data => {
  //     this.restuarants = data;
  //   });
  // }

}
