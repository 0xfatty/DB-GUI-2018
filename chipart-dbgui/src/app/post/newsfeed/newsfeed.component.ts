import { Component, OnInit } from '@angular/core';
import { Post } from '../../_models';
import { AuthenticationService, PostService, AlertService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  postList: Post[];
  curUser: any;

  constructor(
    private router: Router,
    private postService: PostService,
    private authenService: AuthenticationService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.curUser = this.authenService.getCurrentUser();
    if (this.curUser != null && this.curUser !== undefined && this.curUser.id !== undefined) {
      this.loadNewsfeed();
    } else {
      // redirect to home page
      this.router.navigate(['/']);
    }
  }

  loadNewsfeed() {
    this.postService.getNewsfeed(this.curUser.id).then(posts => {
      this.postList = posts;
      // console.log(posts);
    }).catch( error => this.alertService.error('Error in loading newsfeed') );
  }

  unfollow(restId: number) {
    // todo: call api

    this.postService.unfollowRestaurant(this.curUser.id, restId).subscribe(
      response => {
        const res = response.json();
        // console.log(response);
        this.loadNewsfeed();
      }
    );
  }
}
