import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userType: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public userFullname: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
