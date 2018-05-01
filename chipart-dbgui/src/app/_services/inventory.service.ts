import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Inventory } from '../_models/index';
import { AppSettings } from '../app.setttings';

@Injectable()
export class InventoryService {

    private baseURL = AppSettings.API_ENDPOINT + '/inventory';
    constructor(private http: Http) { }

    // getAll() {
    //     return this.http.get<Inventory[]>('/api/inventories');
    // }

    // getById(id: number) {
    //     return this.http.get('/api/inventories/' + id);
    // }

    // create(product: Inventory) {
    //     return this.http.post('/api/inventories', product);
    // }

    // update(product: Inventory) {
    //     return this.http.put('/api/inventories/' + product.id, product);
    // }

    // delete(id: number) {
    //     return this.http.delete('/api/inventories/' + id);
    // }

    getRestaurantIventories(id: number) {
        return this.http.get(`${this.baseURL}/restaurant/${id}`).map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    getAll() {
        return this.http.get(`${this.baseURL}`).map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    getById(id: number) {
        return this.http.get(`${this.baseURL}/${id}`).map((response: Response) => {
            const res = response.json();
            return res;
        })
        .toPromise().then(data => {
            return data;
        });
    }

    create(inventory: Inventory) {
        return this.http.post(this.baseURL, inventory);
    }

    update(inventory: Inventory) {
        return this.http.put(`${this.baseURL}/${inventory.id}`, inventory);
    }

    delete(id: number) {
        console.log(id);
        return this.http.delete(`${this.baseURL}/${id}`);
    }
}
