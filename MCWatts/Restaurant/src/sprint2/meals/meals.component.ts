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
  public id: string;
  public name: string;
  constructor(private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.activedRoute.params.subscribe((params: any) => {
      this.id = params.id;

    this.accountRepo.getMenu(this.id).subscribe(data => {
      this.menu = data;
    });
  });
  }
  public setMeal(m) {
    this.thisMeal = m;
  }

}
