import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Review } from '../_models/index';
import { AppSettings } from '../app.setttings';

@Injectable()
export class ReviewService {

    private baseURL = AppSettings.API_ENDPOINT;
    constructor(private http: Http) { }

    getRestaurantReviews(restaurantId: number) {
        return this.http.get(`${this.baseURL}/review/restaurant/${restaurantId}`)
        .map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    getMenuReviews(menuId: number) {
        return this.http.get(`${this.baseURL}/review/menu/${menuId}`)
        .map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    getById(id: number) {
        return this.http.get(`${this.baseURL}/review/${id}`);
        // .map((response: Response) => {
        //     const res = response.json();
        //     return res;
        // })
        // .toPromise().then(data => {
        //     return data;
        // });
    }

    create(review: Review) {
        return this.http.post(`${this.baseURL}/review`, review);
    }

    update(review: Review) {
        return this.http.put(`${this.baseURL}/review/${review.id}`, review);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseURL}/review/${id}`);
    }
}
