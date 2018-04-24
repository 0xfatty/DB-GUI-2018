
import { Events } from './../../app/domain/modules/events';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import { AccountRepostitory } from '../../app/domain/account-info-repository.service.';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router) { }
    public id: string;
    public name: string;
    public dates: Events[];
    public nums: number;
  ngOnInit() {
    this.dates = [];
    this.name = localStorage.getItem('name');
    this.activedRoute.params.subscribe((params: any) => {
      this.id = params.id;
      this.accountRepo.getFoodGroups(this.id).subscribe(data => {
        data.forEach(items => {
          this.dates.push(new Events(items.ingredientName, items.ingredientEXP));
        });
        this.nums = this.dates.length;

        if(this.dates.length === 4) {
        $('#calendar').fullCalendar({
          // put your options and callbacks here
          height: 10,
          contentHeight: 600,
          events:
          [
            {
              title  : `${this.dates[0].title}`,
              start  : `${this.dates[0].start}`,
              allDay: true
            },
            {
              title  : `${this.dates[1].title}`,
              start  : `${this.dates[1].start}`,
              allDay: true
            },
            {
              title  : `${this.dates[2].title}`,
              start  : `${this.dates[2].start}`,
              allDay: true
            },
            {
              title  : `${this.dates[3].title}`,
              start  : `${this.dates[3].start}`,
              allDay: true
            }
          ]
        });
      }
      if(this.dates.length === 3) {
        $('#calendar').fullCalendar({
          // put your options and callbacks here
          height: 10,
          contentHeight: 600,
          events:
          [
            {
              title  : `${this.dates[0].title}`,
              start  : `${this.dates[0].start}`,
              allDay: true
            },
            {
              title  : `${this.dates[1].title}`,
              start  : `${this.dates[1].start}`,
              allDay: true
            },
            {
              title  : `${this.dates[2].title}`,
              start  : `${this.dates[2].start}`,
              allDay: true
            }
          ]
        });
      }
      if(this.dates.length === 2) {
        $('#calendar').fullCalendar({
          // put your options and callbacks here
          height: 10,
          contentHeight: 600,
          events:
          [
            {
              title  : `${this.dates[0].title}`,
              start  : `${this.dates[0].start}`,
              allDay: true
            },
            {
              title  : `${this.dates[1].title}`,
              start  : `${this.dates[1].start}`,
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
              title  : `${this.dates[0].title}`,
              start  : `${this.dates[0].start}`,
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

    });


  }

}
