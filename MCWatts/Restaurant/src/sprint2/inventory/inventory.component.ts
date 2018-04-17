import {
  Component,
  OnInit
} from '@angular/core';
import { FoodGroup } from '../../app/domain/modules/foodGroup';
import { Food } from '../../app/domain/modules/food';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public groups: FoodGroup[];
  public group: FoodGroup;
  public food: Food;
  constructor() {}

  ngOnInit() {
    this.groups = [];
    this.groups[0] = {};
    this.groups[0].items = [];
    this.groups[1] = {};
    this.groups[1].items = [];
    this.groups[2] = {};
    this.groups[2].items = [];
    this.group = {};
    this.food = {};

    this.groups[0].items = [{
      name: 'Banana',
      type: 'Fruit',
      price: 15,
      amount: 300
    }, {
      name: 'Apple',
      type: 'Fruit',
      price: 5,
      amount: 900
    }, {
      name: 'Pear',
      type: 'Fruit',
      price: 8,
      amount: 450
    }];
    this.groups[1].items = [{
      name: 'Beef',
      type: 'Meat',
      price: 20,
      amount: 60
    }, {
      name: 'Pork',
      type: 'Meat',
      price: 5,
      amount: 90
    }, {
      name: 'Turkey',
      type: 'Meat',
      price: 18,
      amount: 40
    }];
    this.groups[2].items = [{
      name: 'Sardine',
      type: 'Fish',
      price: 15,
      amount: 30
    }, {
      name: 'Salmon',
      type: 'Fish',
      price: 20,
      amount: 20
    }, {
      name: 'Cod',
      type: 'Fish',
      price: 8,
      amount: 50
    }];
    this.groups[0].type = 'Fruits';
    this.groups[1].type = 'Meats';
    this.groups[2].type = 'Fishes';
  }
  public removeFood(f, g) {

    for (let i = 0; i < g.items.length; i++) {
      if (g.items[i] === f) {
        g.items.splice(i, 1);
      }
    }
    // for (let i = 0; i < this.groups.length; i++) {
    //   if (this.groups[i].type === g.type) {
    //     for (let j = 0; i < this.groups[i].items.length; j++) {
    //       if (this.groups[i].items[j] === f) {
    //         this.groups[i].items.splice(j, 1);
    //         break;
    //       }
    //     }
    //     break;
    //   }
    // }
  }
  public addGroup() {
    this.groups.push(this.group);
    this.groups[this.groups.length - 1].items = [];
    this.group = {};
  }
  public setType(g) {
    this.food.type = g.type;

  }
  public addFood() {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.food.type === this.groups[i].type) {
        this.groups[i].items.push(this.food);
        break;
      }
    }
    this.food = {};
  }
  public setFood(f) {
   this.food = f;
  }
  public removeGroup(g) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i] === g) {
        this.groups.splice(i, 1);
      }
    }
  }


}
