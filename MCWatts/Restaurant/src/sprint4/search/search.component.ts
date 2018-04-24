import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepostitory } from '../../app/domain/account-info-repository.service.';
import { Restuarant } from '../../app/domain/modules/user-Restaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  public search: any;
  public myRestaurant: Restuarant;
  public restuarants: Restuarant[];
  constructor(private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router) { }
  public id: string;
  public name: string;
  ngOnInit() {

    this.name = localStorage.getItem('name');
    this.activedRoute.params.subscribe((params: any) => {
      this.id = params.id;


  });
    this.myRestaurant = new Restuarant();
  }
  public setRestaurant(r) {
    this.myRestaurant = r;
  }
  public save() {
    this.accountRepo.addRest(this.id, this.myRestaurant);
  }

  public citySearch() {
    this.accountRepo.getRestCity(this.search).subscribe(data => {
      this.restuarants = data;
    });
  }
  public zipSearch() {
    this.accountRepo.getRestZip(this.search).subscribe(data => {

      this.restuarants = data;
    });
  }
  public nameSearch() {
    this.accountRepo.getRestName(this.search).subscribe(data => {
      this.restuarants = data;
    });
  }

}
