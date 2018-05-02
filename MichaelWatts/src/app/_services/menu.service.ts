import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Menu } from '../_models/index';
import { AppSettings } from '../app.setttings';

@Injectable()
export class MenuService {

    private baseURL = AppSettings.API_ENDPOINT;
    constructor(private http: Http) { }

    getRestaurantMenus(restaurantId: number) {
        return this.http.get(`${this.baseURL}/menu/restaurant/${restaurantId}`)
        .map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    getById(id: number) {
        return this.http.get(`${this.baseURL}/menu/${id}`);
        // .map((response: Response) => {
        //     const res = response.json();
        //     return res;
        // })
        // .toPromise().then(data => {
        //     return data;
        // });
    }

    create(menu: Menu) {
        return this.http.post(`${this.baseURL}/menu`, menu);
    }

    update(menu: Menu) {
        return this.http.put(`${this.baseURL}/menu/${menu.id}`, menu);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseURL}/menu/${id}`);
    }
}
