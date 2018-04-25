import { Restuarant } from './../../app/domain/modules/user-Restaurant';
import { Component, OnInit } from '@angular/core';
import { AccountRepostitory } from '../../app/domain/account-info-repository.service.';
import { ActivatedRoute, Router } from '@angular/router';

@Component({

  templateUrl: './myRestaurant.component.html',
  styleUrls: ['./myRestaurant.component.css']
})
export class MyRestaurantComponent implements OnInit {
  public myRestaurant: Restuarant;
  public restuarants: Restuarant[];
  constructor(private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router) { }
  public id: string;
  public name: string;
  ngOnInit() {
    this.id = localStorage.getItem('authKey');
    this.name = localStorage.getItem('name');
    this.restuarants = [];
    this.accountRepo.getUserRestuarants(this.id).subscribe(data => {
      data.forEach(ind => {
        this.accountRepo.getRestuarantFromID(ind.restID).subscribe(data2 => {

          this.restuarants.push(data2[0]);
        });
        // console.log(this.restuarants);
      });

    });
    this.myRestaurant = new Restuarant();
  }
  public setRestaurant(r) {
    this.myRestaurant = r;
  }
  public remove() {
    console.log(this.myRestaurant.idrestaurant);
    this.accountRepo.removeRest(this.id, this.myRestaurant).subscribe(data => {
      this.restuarants = [];
      // this.router.navigateByUrl('userRestaurants');
      this.ngOnInit();
      // this.accountRepo.getUserRestuarants(this.id).subscribe(data2 => {

      //   console.log(data);
      //   this.restuarants.push(data2[0]);
      // });
      this.myRestaurant = new Restuarant();
    });
  }

}
