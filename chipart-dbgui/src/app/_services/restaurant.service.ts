import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from '../_models/restaurant';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSettings } from '../app.setttings';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};


@Injectable()
export class RestaurantService {

  private baseURL = AppSettings.API_ENDPOINT + '/restaurant';

  constructor(private http: Http) { }

  /** GET restaurants from the server */
  getRestaurants() {
    return this.http.get(this.baseURL).map(
      (response: Response) => {
        const res = response.json();
        return res;
      }).toPromise().then(
        data => {
          // new Buffer( results[1].imageName, 'binary' ).toString();
          return data;
        });
  }

  /** GET all restaurants in the point of view of a specific guest */
  getRestaurantsByGuest(guestId) {
    const url = `${this.baseURL}/by-guest/${guestId}`;
    return this.http.get(url).map(
      (response: Response) => {
        const res = response.json();
        return res;
      }).toPromise().then(
        data => {
          return data;
        });
  }

  /** GET restaurant by id. Will 404 if id not found */
  getRestaurant(id: number): Promise<Restaurant> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get(url).map((response: Response) => {
      const res = response.json();
      res.imageName = this.getImageFromBlob(res.imageName);
      return res;
    })
      .toPromise().then(data => {
        return data;
      });
  }

  /** GET restaurant by owner id. Will 404 if id not found */
  getOwnerRestaurant(ownerId: number): Promise<Restaurant> {
    // console.log('ownerId is: ' + ownerId);
    const url = `${this.baseURL}/by-owner/${ownerId}`;
    return this.http.get(url).map((response: Response) => {
      const res = response.json();
      // res.imageName = this.getImageFromBlob(res.imageName);
      return res;
    })
      .toPromise().then(data => {
        return data;
      });
  }

  /** PUT: update the restaurant on the server */
  // updateRestaurant(restaurant: Restaurant): Observable<any> {
  //   return this.http.put(this.baseURL, restaurant, httpOptions).pipe(
  //     tap(_ => this.log(`updated restaurant id=${restaurant.id}`)),
  //     catchError(this.handleError<any>('updaterestaurant'))
  //   );
  // }


  updateRestaurant(rest: Restaurant) {
    return this.http.put(`${this.baseURL}/${rest.id}`, rest);
  }

  // /** POST: add a new restaurant to the server */
  addRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.post(this.baseURL, restaurant, httpOptions).pipe(
      tap((_: any) => this.log(`added restaurant w/ id=${_.id}`)),
      catchError(this.handleError<Restaurant>('addRestaurant'))
    );
  }

  /* GET restaurants whose name contains search term */
  searchRestaurants(term: string, usrId: number): Promise<Restaurant[]> {
    if (!term.trim()) {
      // if not search term, return empty restaurant array.
      return null;
    }

    return this.http.post(`${this.baseURL}/search/${term}`, {userId: usrId} ).map((response: Response) => {
      const res = response.json();
      return res;
    }).toPromise().then(data => {
      return data;
    });
  }
  /** DELETE: delete the restaurant from the server */
  deleteRestaurant(restaurant: Restaurant | number): Promise<Restaurant> {
    const id = typeof restaurant === 'number' ? restaurant : restaurant.id;
    const url = `${this.baseURL}/${id}`;

    return this.http.delete(url, httpOptions).map((response: Response) => {
      const res = response.json();
      return res;
    })
      .toPromise().then(data => {
        return data;
      });
  }


  private log(message: string) {
    console.log('RestaurantService: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getImageFromBlob(blob) {
    return (new Buffer(blob, 'binary' )).toString();
  }
}
