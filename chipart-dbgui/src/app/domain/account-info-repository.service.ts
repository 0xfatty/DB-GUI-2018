import { Review } from './modules/review';
import { Meal } from './modules/meal';
import { FoodGroup } from './modules/foodGroup';
import { Restuarant } from './modules/user-Restaurant';
import {catchError} from 'rxjs/operators';
import {
  Observable
// tslint:disable-next-line:import-blacklist
} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../domain/modules/user';
import { Food } from './modules/food';
import { Info } from './modules/info';

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
  public getRestuarants(idNum: string): Observable<Restuarant[]> {

    return this.httpClient.get(`${this.endPoint}/getRest/${idNum}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public getRestuarantFromID(idNum: string): Observable<Restuarant> {

    return this.httpClient.get(`${this.endPoint}/getRestaurantFromID/${idNum}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public getUserRestuarants(idNum: string): Observable<Restuarant[]> {

    return this.httpClient.get(`${this.endPoint}/getUserFollows/${idNum}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public addChefResturant(idNum: string, newRest: Restuarant): Observable<Restuarant> {
    return this.httpClient.post(`${this.endPoint}/newRest/${idNum}`, newRest, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getFoodGroups( restID: string): Observable<Food[]> {
    return this.httpClient.get(`${this.endPoint}/getGroup/${restID}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
    // Dear Michael you have to rebuild the subarrays for the atual groups because andrew smellz
  }

  public deleteFoodGroup(restId: string, groupToDelte: FoodGroup): Observable<FoodGroup> {
    return this.httpClient.post(`${this.endPoint}/deleteGroup/${restId}`, groupToDelte, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public deleteFood(idNum: string, foodToDelte: Food): Observable<Food> {
    return this.httpClient.post(`${this.endPoint}/deleteFood/${idNum}`, foodToDelte, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getRestCity( city: string): Observable<Restuarant[]> {
    return this.httpClient.get(`${this.endPoint}/getRestByCity/${city}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public getRestZip( zip: Number): Observable<Restuarant[]> {
    return this.httpClient.get(`${this.endPoint}/getRestByZip/${zip}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public getRestName( name: string): Observable<Restuarant[]> {
    return this.httpClient.get(`${this.endPoint}/getRestByName/${name}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public addFood(idNum: string, newFood: Food): Observable<Food> {
    return this.httpClient.post(`${this.endPoint}/newIngredient/${idNum}`, newFood, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public addMeal(idNum: string, menuItem: Meal) {
    return this.httpClient.post(`${this.endPoint}/newFood/${idNum}`, menuItem, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public deleteMeal(idNum: string, menuItem: Meal) {
    return this.httpClient.post(`${this.endPoint}/deleteMeal2/${idNum}`, menuItem, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public getMenu( restID: number): Observable<Meal[]> {
    return this.httpClient.get(`${this.endPoint}/getMenu/${restID}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public getRest( userID: string): Observable<Info[]> {
    return this.httpClient.get(`${this.endPoint}/getUserFollows/${userID}`, this.httpOptions).pipe(
      catchError(this.handleException)
  );
}
public addRest( userID: string, rest: Restuarant): Observable<Restuarant> {
  return this.httpClient.post(`${this.endPoint}/addRest/${userID}`, rest,  this.httpOptions).pipe(
    catchError(this.handleException)
);
}
public removeRest( userID: string, rest: Restuarant): Observable<Restuarant[]> {
  return this.httpClient.post(`${this.endPoint}/deleteRest/${userID}`, rest,  this.httpOptions).pipe(
    catchError(this.handleException)
);
}

public addReview (restId: string, rating: Review) {
  return this.httpClient.post(`${this.endPoint}/addReview/${restId}`, rating, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}
public changeFoodGroupName(idNum: string, editedFood: FoodGroup) {
  return this.httpClient.post(`${this.endPoint}/updateGroupName/${idNum}`, editedFood, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}




 // Dear Michael casey is a punk ass buster, add logic so if a food group is left empty it is not saved, figure it out you punk ass buster

  public updateFood(idNum: string, editedFood: Food): Observable<Food> {
    return this.httpClient.post(`${this.endPoint}/updateFood/${idNum}`, editedFood, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public updateRest(idNum: string, rest: Restuarant): Observable<Restuarant> {
    return this.httpClient.post(`${this.endPoint}/updateRestInfo/${idNum}`, rest, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }
  public deleteRest(idNum: string, rest: Restuarant): Observable<Restuarant>  {
    return this.httpClient.post(`${this.endPoint}/deleteRestaurant/${idNum}`, rest, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

















}


