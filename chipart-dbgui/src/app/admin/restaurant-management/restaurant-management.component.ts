import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../_models/restaurant';
import { Review } from '../../_models/review';
import { Router } from '@angular/router';
import { RestaurantService } from '../../_services/restaurant.service';

@Component({
  selector: 'app-restaurant-management',
  templateUrl: './restaurant-management.component.html',
  styleUrls: ['./restaurant-management.component.css']
})
export class RestaurantManagementComponent implements OnInit {

  restaurantList: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService,
    private router: Router) { }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants()
      .then(restaurants => {
        this.restaurantList = restaurants;
        console.log(restaurants);

        for (let i = 0; i < this.restaurantList.length; i++) {
            this.restaurantList[i].imageName = this.restaurantService.getImageFromBlob(this.restaurantList[i].imageName);
        }

      }).catch(error => console.log(error));
  }
}
