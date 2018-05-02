import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, RestaurantService } from '../../_services';
import { Restaurant, Menu, Review } from '../../_models';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.css']
})
export class RestaurantCreateComponent implements OnInit {

  userId: number;
  // restaurantId: number;
  newRestaurant: Restaurant;

  constructor(    
    private router: Router,
    private authenService: AuthenticationService,
    private restaurantService: RestaurantService,
) { }

  ngOnInit() {
    const curUser = this.authenService.getCurrentUser();
    if (curUser != null && curUser !== undefined && curUser.id !== undefined && curUser.type === 3) {
      this.userId = curUser.id;
      this.restaurantService.getOwnerRestaurant(this.userId).then(
        data => {
          if (data != null && data !== undefined && data.id !== undefined) {
            this.router.navigate(['/my-restaurant']);
          } else {
            // do nothing
          }
        }
      );
    } else {
      // redirect to home page
      this.router.navigate(['/']);
    }
  }

  createNewRestaurant() {
    this.newRestaurant = {
      id: 0,
      name: '',
      description: '',
      imageName: 'https://www.hsjaa.com/images/joomlart/demo/default.jpg',
      address: '',
      zipcode: '',
      link: '',
      rate: null,
      ownerId: this.userId,
      city: '',
      // menus: [],
      // reviews: [],
    };

    this.restaurantService.addRestaurant(this.newRestaurant).subscribe(
      response => {
        const data = response.json();
        console.log(data);
        if (data != null && data !== undefined && data.id !== undefined) {
          console.log('should redirect');
          this.router.navigate(['/my-restaurant']);
        } else {
          console.log('why should not redirect');
          // do nothing
        }
    }
    );
  }
}
