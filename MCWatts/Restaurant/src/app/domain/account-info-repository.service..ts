import { Restuarant } from './modules/user-Restaurant';
import {catchError} from 'rxjs/operators';
import {
  Observable
// tslint:disable-next-line:import-blacklist
} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../domain/modules/user';

@Injectable()
export class AccountRepostitory {
  private endPoint = 'http://18.188.67.78:3000';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'backend:FarkMontenot'
    })
  };
  constructor(protected httpClient: HttpClient) {}
  protected handleException(exception: any) {

    const message = `${exception.status} : ${exception.statusText}\r\n`;
    alert(message);
    return Observable.throw(exception);

  }
  public check(user: User): Observable<User> {
    return this.httpClient.post(`${this.endPoint}/login`, user, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public getRestuarants(userName: String, key: String): Observable<Restuarant[]> {
   //  body: new Http({'authKey': `${key}`);
    return this.httpClient.get(`${this.endPoint}/`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
}
// post to post new restuants to list:  Restuarant

// get to get inventory:  FoodGroup[]

// post to update inventory: FoodGroup

// post to update group: Food

// delete to remove inventory: FoodGroup

// delete to remove inventory: Food

// Post to get meals for resturant: Meal[]

// Post to get user restaurant list: Restuarant[]
