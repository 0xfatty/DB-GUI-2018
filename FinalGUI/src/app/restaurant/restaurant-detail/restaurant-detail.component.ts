import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Restaurant, Review, Menu } from '../../_models/index';
import { RestaurantService, MenuService, ReviewService, AuthenticationService } from '../../_services/index';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  curUser = this.authService.getCurrentUser();
  wasUserHere: Boolean = false;
  curMenuRatingValue: Number = 0;
  curRatedMenu: Menu = null;
  id: number;

  private restaurant: Restaurant = {
    description: '',
    id: 0,
    link: '',
    imageName: '',
    name: '',
    address: '',
    zipcode: '',
    rate: 0,
    menus: [],
    reviews: [],
  };

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private reviewService: ReviewService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getRestaurant();
  }
// get resturant by ID
  getRestaurant(): void {
    this.restaurantService.getRestaurant(this.id)
      .then(restaurant => {
        this.restaurant = restaurant;

        // if (this.restaurant.reviews === undefined || this.restaurant.reviews === null) {
        //   this.restaurant.reviews = [];
        // }
        this.loadRestaurantReviews();
        this.loadRestaurantMenus();
      });
  }
  loadRestaurantReviews() {
    this.reviewService.getRestaurantReviews(this.restaurant.id).then(
      data => { this.restaurant.reviews = data; },
      error => {
        console.log(error);
      });
  }
  // get resturant's menu by ID
  loadRestaurantMenus() {
    this.menuService.getRestaurantMenus(this.restaurant.id).then(
      data => { this.restaurant.menus = data; console.log(data); },
      error => {
        console.log(error);
      });
  }
  confimrVisitAlready() {
    // send request to server to to mark user was here
    this.wasUserHere = true;
  }

  openRatingDialog(menu: Menu) {
    this.curRatedMenu = menu;
    this.curMenuRatingValue = 5;
    $('#ratingDlg').modal('show');
  }

  rateMenu() {
    console.log('I want to rate this menu-' + this.curRatedMenu.id + ' ' + this.curMenuRatingValue + ' star');
    // TODO: call api to rate this  menu
    this.reviewService.create({
      date: new Date(), rating: this.curMenuRatingValue, reviewOf: this.curRatedMenu.id, type: 2, userName: this.curUser.username
    } as Review).subscribe(
      data => {
        this.loadRestaurantMenus();
      },
      error => {
        console.log(error);
      }
    );

    $('#ratingDlg').modal('hide');
    this.curRatedMenu = null;
  }

  onSelect(level: number) {
    this.curMenuRatingValue = level;
    console.log('cur menu rating is: ' + this.curMenuRatingValue);
  }
}
