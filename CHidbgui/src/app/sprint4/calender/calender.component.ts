
import { Events } from '../../domain/modules/events';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountRepostitory } from '../../domain/account-info-repository.service';
import { AuthenticationService, RestaurantService } from '../../_services';

import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import { FoodService } from '../../_services/food.service';
import { Restaurant } from '../../_models';

@Component({
  selector: 'app-my-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
  providers: [FoodService]
})
export class MyCalenderComponent implements OnInit {

  constructor(
    private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private authenService: AuthenticationService,
    private foodService: FoodService,
    private router: Router) {
  }

  curUser: any;
  public id: number;
  public restaurant: Restaurant;
  public name: string;
  public dates: Events[];
  public nums: number;

  ngOnInit() {

    this.curUser = this.authenService.getCurrentUser();
    this.name = this.curUser.username;
    this.dates = [];

    this.restaurantService.getOwnerRestaurant(this.curUser.id).then(
      restaurant => {
        // console.log(restaurant);
        this.restaurant = restaurant;
        this.id = this.restaurant.id;

        this.foodService.getFoodGroups(this.id).subscribe((response: any[]) => {
          console.log('get foodgroups data');
          console.log(response);
          response.forEach(items => {
            this.dates.push(new Events(items.productName, items.expirationDate));
          });

          this.nums = this.dates.length;
          if (this.dates.length === 10) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[2].title}`,
                    start: `${this.dates[2].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[3].title}`,
                    start: `${this.dates[3].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[4].title}`,
                    start: `${this.dates[4].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[5].title}`,
                    start: `${this.dates[5].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[6].title}`,
                    start: `${this.dates[6].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[7].title}`,
                    start: `${this.dates[7].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[8].title}`,
                    start: `${this.dates[8].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[9].title}`,
                    start: `${this.dates[9].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 9) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[2].title}`,
                    start: `${this.dates[2].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[3].title}`,
                    start: `${this.dates[3].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[4].title}`,
                    start: `${this.dates[4].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[5].title}`,
                    start: `${this.dates[5].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[6].title}`,
                    start: `${this.dates[6].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[7].title}`,
                    start: `${this.dates[7].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[8].title}`,
                    start: `${this.dates[8].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 8) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[2].title}`,
                    start: `${this.dates[2].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[3].title}`,
                    start: `${this.dates[3].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[4].title}`,
                    start: `${this.dates[4].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[5].title}`,
                    start: `${this.dates[5].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[6].title}`,
                    start: `${this.dates[6].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[7].title}`,
                    start: `${this.dates[7].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 7) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[2].title}`,
                    start: `${this.dates[2].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[3].title}`,
                    start: `${this.dates[3].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[4].title}`,
                    start: `${this.dates[4].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[5].title}`,
                    start: `${this.dates[5].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[6].title}`,
                    start: `${this.dates[6].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 6) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[2].title}`,
                    start: `${this.dates[2].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[3].title}`,
                    start: `${this.dates[3].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[4].title}`,
                    start: `${this.dates[4].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[5].title}`,
                    start: `${this.dates[5].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 5) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[2].title}`,
                    start: `${this.dates[2].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[3].title}`,
                    start: `${this.dates[3].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[4].title}`,
                    start: `${this.dates[4].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 4) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[2].title}`,
                    start: `${this.dates[2].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[3].title}`,
                    start: `${this.dates[3].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 3) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[2].title}`,
                    start: `${this.dates[2].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 2) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  },
                  {
                    title: `${this.dates[1].title}`,
                    start: `${this.dates[1].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 1) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                  {
                    title: `${this.dates[0].title}`,
                    start: `${this.dates[0].start}`,
                    allDay: true
                  }
                ]
            });
          }
          if (this.dates.length === 0) {
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              height: 10,
              contentHeight: 600,
              events:
                [
                ]
            });
          }
          // $('#calendar').fullCalendar({
          //   // put your options and callbacks here
          //   height: 10,
          //   contentHeight: 600,
          //   events: function(start, end, timezone, callback) {
          //   let events = [];
          //   console.log(`${this.nums}`);
          //   for (let i = 0; i < this.nums; i++) {

          //   events.push({
          //     title: `${this.dates[i].title}`,
          //     start: `${this.dates[i].start}`
          //   });
          // }
          //   console.log(events);
          //   callback(events);

          //   }
          // });
        });
      }
    ).catch(
      error => {
        console.log('Error:');
        console.log(error);
      }
    );
  }
}
