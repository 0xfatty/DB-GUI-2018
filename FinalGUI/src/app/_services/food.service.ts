import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Food } from '../domain/modules/food';
import { AppSettings } from '../app.setttings';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FoodService {

  private httpOptions = {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'backend:FarkMontenot'
    })
  };

  private baseURL = AppSettings.API_ENDPOINT;
  constructor(private http: Http) { }

  public getFoodGroups(restID: number) {
    return this.http.get(`${this.baseURL}/inventory/expiration/${restID}`, this.httpOptions).map(
      response => {
        return response.json();
      }
    ).pipe(
      data => {
        // console.log('food group');
        // console.log(data);
        return data;
      },
      catchError(this.handleException)
    );
  }

  handleException(ex) {
    console.log(ex);
    return ex;
  }
}
