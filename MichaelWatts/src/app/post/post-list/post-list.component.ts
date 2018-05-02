import { Component, OnInit } from '@angular/core';
import { Post } from '../../_models';
import { PostService } from '../../_services/post.service';
import { AuthenticationService, RestaurantService } from '../../_services';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  loading = false;
  postList: Post[];
  restaurantId: number;
  model: any = {};
  curUser: any;
  toDeletePost: Post;
  selectedPostId: number = 0;

  newPost: Post = {
    id: 0,
    content: '',
    restaurantId: 0,
    userId: 0
  };

  constructor(
    private postService: PostService,
    private authenService: AuthenticationService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit() {
    this.curUser = this.authenService.getCurrentUser();
    this.restaurantService.getOwnerRestaurant(this.curUser.id).then(
      rest => {
        this.restaurantId = rest.id;
        if (this.restaurantId !== undefined) {
          this.loadMyPosts();
        }
      }
    );
  }

  loadMyPosts() {
    this.postService.getRestaurantPosts(this.restaurantId).then(posts => {
      this.postList = posts;
      console.log(posts);
    }).catch(error => console.log(error));
  }

  resetForm() {
    this.newPost.content = '';
  }

  onSubmitAddNew(myForm: any) {
    this.newPost.restaurantId = this.restaurantId;
    this.newPost.userId = this.curUser.id;
    this.postService.create(this.newPost).subscribe(
      response => {
        const res = response.json();
        if (res.result === 1) {
          // this.postList.unshift(this.newPost);
          this.loadMyPosts();
        }
        this.resetForm();
      }
    );
  }

  editPost(item: Post) {
    this.model.content = item.content;
    this.model.id = item.id;
    $('#postEditlDlg').modal('show');
  }

  saveEditPost(): void {
    // this.model.content = item.content;
    // this.model.id = item.id;
    console.log(this.model);
    // this.postList.unshift(this.model);
    this.postService.update(this.model).subscribe(
      data => {
        // console.log(data);
        this.loadMyPosts();
        $('#postEditlDlg').modal('hide');
      });
    $('#postEditlDlg').modal('hide');
  }

  confirmToDelete(item: Post) {
    this.toDeletePost = item;
    $('#deleteConfirmDlg').modal('show');
  }

  deletePost() {
    this.loading = true;
    this.postService.delete(this.toDeletePost.id).subscribe(
      response => {
        const tmp = response.json();
        if (tmp.result === 1) {
          const index = this.postList.indexOf(this.toDeletePost);
          this.postList.splice(index, 1);
        }
        this.loading = false;
        $('#deleteConfirmDlg').modal('hide');
      }
    );
  }
}
