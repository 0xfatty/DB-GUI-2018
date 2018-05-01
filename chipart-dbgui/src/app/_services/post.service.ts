import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Post } from '../_models';
import { AppSettings } from '../app.setttings';

@Injectable()
export class PostService {

    private baseURL = AppSettings.API_ENDPOINT;
    constructor(private http: Http) { }

    getRestaurantPosts(restaurantId: number) {
        return this.http.get(`${this.baseURL}/post/restaurant/${restaurantId}`)
        .map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    getNewsfeed(userId: number) {
        return this.http.get(`${this.baseURL}/newsfeed/${userId}`)
        .map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    followRestaurant(usrId: number, restId: number) {
        return this.http.post(`${this.baseURL}/follow`, {userId: usrId, restaurantId: restId});
    }

    unfollowRestaurant(usrId: number, restId: number) {
        return this.http.post(`${this.baseURL}/unfollow`, {userId: usrId, restaurantId: restId});
    }

    getById(id: number) {
        return this.http.get(`${this.baseURL}/post/${id}`);
    }

    isFollowing(usrId: number, restId: number) {
        return this.http.post(`${this.baseURL}/is-following`, {userId: usrId, restaurantId: restId});
    }

    create(post: Post) {
        console.log(post);
        return this.http.post(`${this.baseURL}/post`, post);
    }

    update(post: Post) {
        return this.http.put(`${this.baseURL}/post/${post.id}`, post);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseURL}/post/${id}`);
    }
}
