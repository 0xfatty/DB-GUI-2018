
import { element } from 'protractor';
import { AccountRepostitory } from './../../app/domain/account-info-repository.service.';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FoodGroup
} from '../../app/domain/modules/foodGroup';
import {
  Food
} from '../../app/domain/modules/food';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public groups: FoodGroup[];
  public group: FoodGroup;
  public food: Food;
  public id: string;
  public name: string;
  constructor(private accountRepo: AccountRepostitory,
    private activedRoute: ActivatedRoute,
    private router: Router ) {}

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.activedRoute.params.subscribe((params: any) => {
      this.id = params.id;
    });
    this.makeSubGroups();

    this.group = new FoodGroup();
    this.food = new Food();
  }
  public removeFood(f, g) {
    console.log(f);
    this.accountRepo.deleteFood(this.id, f);
    this.makeSubGroups();
  }
  public addGroup() {
    this.groups.push(this.group);
    this.groups[this.groups.length - 1].items = [];
    this.group = {};
  }
  public setType(g) {
    this.food.group = g.type;

  }
  public addFood() {
    this.accountRepo.addFood(this.id, this.food);
    this.food = {};
    this.makeSubGroups();
  }
  public setFood(f) {
    this.food = f;
  }
  public removeGroup(g) {
    this.accountRepo.deleteFoodGroup(this.id, g);
    this.makeSubGroups();
  }
private makeSubGroups() {
  this.accountRepo.getFoodGroups(this.id).subscribe(data => {
    let names = [];

    data.forEach(info => {

      let flag = true;
      for (let i = 0; i < names.length; i++) {
        if (names[i] === info.ingGroup) {
          flag = false;
        }
      }
      if (flag) {
        names.push(info.ingGroup);
        flag = false;
      }

    });

    this.groups = [];
    for (let i = 0; i < names.length; i++) {
      let a = new FoodGroup();
      this.groups.push(a);
      this.groups[i].type = names[i];
      this.groups[i].items = [];
    }
    data.forEach(info => {
      for (let i = 0; i < names.length; i++) {
        if (this.groups[i].type === info.ingGroup) {
          this.groups[i].items.push(info);
        }
      }
    });

    this.groups.forEach(item => {
      item.items.forEach(specItem => {
        specItem.amount = specItem.ingredientAmt;
        specItem.expirationDate = specItem.ingredientEXP;
        specItem.name = specItem.ingredientName;
      });
    });
  });
}

}
