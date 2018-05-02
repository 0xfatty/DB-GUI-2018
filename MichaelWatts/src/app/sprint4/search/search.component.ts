import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../domain/account-info-repository.service';
import { Restuarant } from '../../domain/modules/user-Restaurant';
import { AuthenticationService, RestaurantService, AlertService, PostService } from '../../_services';
import { Restaurant } from '../../_models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  curUser: any;
  public search: any;
  public restaurants: Restaurant[];
  public id: string;
  public name: string;

  constructor(
    private accountRepo: AccountRepostitory,
    private authenService: AuthenticationService,
    private activedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private alertService: AlertService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.curUser = this.authenService.getCurrentUser();

    this.name = this.curUser.username; //holds the name of the current user
    this.id = this.curUser.id; // holds the current user ID

  }

  public searchForRestaurant() {
    // passes user ID and search criteria to data base and sets result to resturant array
    this.restaurantService.searchRestaurants(this.search, this.curUser.id).then(data => {
      this.restaurants = data;
      for (let i = 0; i < this.restaurants.length; i++) {
        // extracts blob for resturantImage
        this.restaurants[i].imageName = this.restaurantService.getImageFromBlob(this.restaurants[i].imageName);
      }
      console.log(this.restaurants); // to confirm all resturants present

    }).catch(error => {
      console.log(error);
      this.alertService.error('Error in searching'); // error handling
    });
  }


  followOrUnfollow(event, rest): void {
    // method to add or if present remove a resturant to a user's following to keep them updatated
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
