import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  public menu: Meal[];
  public thisMeal: Meal;
  constructor() { }

  ngOnInit() {
    this.menu = [ {name: 'Chicken Parmesan', price: 15, ingredients: 'Chicken and Parmesan Cheese', amountSold: 100},
 {name: 'Spaghetti and Meatballs', price: 12, ingredients: 'Pasta and Ground Beef', amountSold: 150},
{name: 'Cesar Salad', price: 9, ingredients: 'Lettuce, Parmesan Cheese, Anchovies', amountSold: 300},
 {name: 'Spaghetti and Red Sauce', price: 7, ingredients: 'Pasta and Ragu', amountSold: 200},
  ];
    console.log(this.menu);
  }
  public setMeal(m) {
    this.thisMeal = m;
  }

}
