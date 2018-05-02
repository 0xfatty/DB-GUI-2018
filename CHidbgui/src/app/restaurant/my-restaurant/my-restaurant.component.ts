import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, RestaurantService } from '../../_services';

@Component({
  selector: 'app-my-restaurant',
  templateUrl: './my-restaurant.component.html',
  styleUrls: ['./my-restaurant.component.css']
})
export class MyRestaurantComponent implements OnInit {

  userId: number;
  restaurantId: number;

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
          console.log('owner restaurant is:');
          console.log(data);
          if (data != null && data !== undefined && data.id !== undefined) {
            console.log(data.id);
            this.restaurantId = data.id;
          } else {
            console.log('navigate to new page');
            this.router.navigate(['/my-restaurant', 'create-new']);
          }
        }
      ).catch(
        error => {
          console.log('error in getting owner restaurant');
          console.log(error);
        });

    } else {
      // redirect to home page
      this.router.navigate(['/']);
    }
  }

}
