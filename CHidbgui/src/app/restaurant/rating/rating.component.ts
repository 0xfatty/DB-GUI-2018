import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RestaurantRatingComponent implements OnInit {

  @Input() ratingValue: number;

  constructor() { }

  ngOnInit() {
  }

  onSelect(level: number) {
    // this.ratingValue = level;
  }

}
