import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../_models/index';
import { AppSettings } from '../app.setttings';

@Injectable()
export class UserService {

    private baseURL = AppSettings.API_ENDPOINT;
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.baseURL + '/user').map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    getById(id: number) {
        return this.http.get(this.baseURL + '/user/' + id).map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    create(user: User) {
        return this.http.post(this.baseURL + '/user', user);
    }

    update(user: User) {
        return this.http.put(this.baseURL + '/user/' + user.id, user);
        // .map((response: Response) => {
        //     const res = response.json();
        //     return res;
        // })
        // .toPromise().then(data => {
        //     return data;
        // });
    }

    delete(id: number) {
        return this.http.delete(this.baseURL + '/user/' + id);
    }
}
