import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../_models/restaurant';
import { Review, User } from '../../_models/';
import { Router } from '@angular/router';
import { RestaurantService } from '../../_services/restaurant.service';
import { PostService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurantList: Restaurant[] = [];
  curUser: User;

  constructor(
    private restaurantService: RestaurantService,
    private postService: PostService,
    private authService: AuthenticationService,
    private router: Router) {
    this.curUser = authService.getCurrentUser();
  }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurantsByGuest(this.curUser.id)
      .then(restaurants => {
        this.restaurantList = restaurants;
        // console.log(restaurants);

        for (let i = 0; i < this.restaurantList.length; i++) {
          this.restaurantList[i].imageName = this.restaurantService.getImageFromBlob(this.restaurantList[i].imageName);
        }

      }).catch(error => console.log(error));
  }

  followOrUnfollow(event, rest): void {
    this.postService.isFollowing(this.curUser.id, rest.id).subscribe(
      data => {
        const tmp = data.json();
        if (tmp !== undefined && tmp.result === 1) {
          console.log('unfollow');
          this.postService.unfollowRestaurant(this.curUser.id, rest.id).subscribe(
            response => {
              const res = response.json();
              // console.log(response);
              event.srcElement.innerHTML = 'Follow';
            }
          );
        }

        if (tmp !== undefined && tmp.result === 0) {
          console.log('follow');
          this.postService.followRestaurant(this.curUser.id, rest.id).subscribe(
            response => {
              const res = response.json();
              // console.log(response);
              event.srcElement.innerHTML = 'Unfollow';
            }
          );
        }
      }
    );
  }
}
