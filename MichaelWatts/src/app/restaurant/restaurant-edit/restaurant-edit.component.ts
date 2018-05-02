import { Component,  OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService, MenuService, AlertService } from '../../_services';
import { Restaurant, Menu } from '../../_models';
import { Location } from '@angular/common';
import { FileUploadComponent } from '../../file-upload/file-upload.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css'],
})
export class RestaurantEditComponent implements OnInit {
  @Input() inputRestaurantId: number;

  restaurantId: number;
  toDeleteMenuItem: Menu;
  selectedMenuId: any = -1;
  inEditMode: any = false;
  loading = false;
  model: any = {};
  fileToUpload: File = null;

  private restaurant: Restaurant = {
    description: '',
    id: 0,
    imageName: '',
    name: '',
    link: '',
    address: '',
    zipcode: '',
    rate: 0,
    menus: [],
    reviews: [],
  };


  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private alertService: AlertService,
    private menuService: MenuService,
    private location: Location) { }

  ngOnInit() {
    if (this.inputRestaurantId === undefined || this.inputRestaurantId === null) {
      this.restaurantId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.restaurantId = this.inputRestaurantId;
    }

    this.getRestaurant();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = function (e) {
      // console.log(e.srcElement);
      $('.current-img-file').attr('src', this.result);
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  changeImage(): void {
    $('.input-file').click();
  }

  getRestaurant(): void {
    // this.restaurantId = +this.route.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(this.restaurantId)
      .then(restaurant => {
        this.restaurant = restaurant;
        if (this.restaurant.menus === undefined || this.restaurant.menus == null) {
          this.restaurant.menus = [];
        }
        this.menuService.getRestaurantMenus(this.restaurantId).then(
          data => { this.restaurant.menus = data; },
          error => {
            console.log(error);
          });

      });
  }

  onSubmit(form: any) {
    this.restaurant.imageName = $('.current-img-file').attr('src');
    console.log(this.restaurant.imageName);
    this.restaurantService.updateRestaurant(this.restaurant)
      .subscribe(() => {
        // this.location.back();
        this.alertService.success('Restaurant was successfully updated ');
      });
  }

  saveNewMenu(): void {
    this.model.restaurantId = this.restaurantId;
    this.model.rate = 0;
    this.model.isHot = false;
    console.log(this.model);
    this.restaurant.menus.push(this.model);
    this.menuService.create(this.model).subscribe(
      data => {
        console.log(data);
      });
    $('#menuModalDlg').modal('hide');
  }

  confirmToDeleteMenu(item: Menu) {
    this.toDeleteMenuItem = item;
    $('#deleteConfirmDlg').modal('show');
  }

  deleteMenu() {
    this.loading = true;
    this.menuService.delete(this.toDeleteMenuItem.id).subscribe(
      response => {
        const tmp = response.json();
        if (tmp.result === 1) {
          const index = this.restaurant.menus.indexOf(this.toDeleteMenuItem);
          this.restaurant.menus.splice(index, 1);
        }
        this.loading = false;
        $('#deleteConfirmDlg').modal('hide');
      }
    );
  }

  editMenu(item: Menu) {
    this.inEditMode = true;
  }
  enableAddingForm(show: boolean) {
    this.inEditMode = false;
    $('#menuModalDlg').modal('show');
  }
}
