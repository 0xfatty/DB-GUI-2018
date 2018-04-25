import { AccountRepostitory } from './../../app/domain/account-info-repository.service.';
import { Component, OnInit } from '@angular/core';
import { Meal } from '../../app/domain/modules/meal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  public menu: Meal[];
  public thisMeal: Meal;
  public id: number;
  public name: string;
  public cost: string;
  constructor(private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.activedRoute.params.subscribe((params: any) => {
      console.log(params.restID);
      this.id = params.restID;
      console.log(this.id);
    this.accountRepo.getMenu(this.id).subscribe(data => {
      console.log(data);
      this.menu = data;
      this.menu.forEach(items => {
        items.price = items.foodCost;
        items.ingredients = items.foodING;
        items.name = items.foodName;
        items.amountSold = items.foodSold;
      });
    });
  });
  }
  public setMeal(m) {
    console.log(m);
    this.thisMeal = m;
    this.thisMeal.foodCost = m.foodCost;

    console.log(this.thisMeal);
  }

}
