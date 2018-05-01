import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Food } from '../domain/modules/food';

@Injectable()
export class FoodService {

  constructor() { }
  public getFoodGroups(restID: string): Observable<Food[]> {
    // return this.httpClient.get(`${this.endPoint}/getGroup/${restID}`, this.httpOptions).pipe(
    //   catchError(this.handleException)
    // );
    // Dear Michael you have to rebuild the subarrays for the atual groups because andrew smellz
    return null;
  }
}
