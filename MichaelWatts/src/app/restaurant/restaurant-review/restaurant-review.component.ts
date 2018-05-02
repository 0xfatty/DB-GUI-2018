import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Review } from '../../_models/review';
import { ReviewService, AuthenticationService } from '../../_services/index';
import { RestaurantRatingComponent } from '../rating/rating.component';


@Component({
  selector: 'app-restaurant-review',
  templateUrl: './restaurant-review.component.html',
  styleUrls: ['./restaurant-review.component.css']
})
export class RestaurantReviewComponent implements OnInit {


  @Input() reviews: Review[];
  @Input() restaurantId: number;
  // @ViewChild(RestaurantRatingComponent)
  // private ratingComponent: RestaurantRatingComponent;

  newReview: Review = {
    comment: '',
    reviewOf: this.restaurantId,
    type: 1,
    date: new Date(),
    rating: null,
    userName: ''
  };
  curUser = this.authService.getCurrentUser();

  constructor(
    private reviewService: ReviewService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    // console.log('restaurantId: ' + this.restaurantId);
  }

  resetForm() {
    this.newReview = {
        type: 2,
        reviewOf: this.restaurantId,
        comment: '',
        date: new Date(),
        rating: null,
        userName: ''
    };
  }

  onSubmit(myForm: any) {
    this.newReview.reviewOf = this.restaurantId;
    // console.log(this.newReview);
    this.reviewService.create(this.newReview).subscribe(
      response => {
        const res = response.json();
        if (res.result === 1) {
          this.reviews.push(this.newReview);
        }
        this.resetForm();
      }
    );
  }
}
