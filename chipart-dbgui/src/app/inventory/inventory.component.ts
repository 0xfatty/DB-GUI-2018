import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../_models/index';
import { AlertService, InventoryService, RestaurantService, AuthenticationService } from '../_services/index';
import { DatePipe } from '@angular/common';

declare var jquery: any;
declare var $: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'inventory.component.html',
    providers: [DatePipe]
})

export class InventoryComponent implements OnInit {
    curUser: any;
    statusList: any = [
        {id: 0, name: 'Out Of Stock'},
        {id: 1, name: 'In Stock'},
    ];
    selectedProd: any = -1;
    inEditMode: any = false;
    restaurantId: number;

    model: any = {};
    loading = false;
    products: Inventory[] = [];
    showAddForm = false;
    toDeleteProd: Inventory;


    constructor(
        private router: Router,
        private datePipe: DatePipe,
        private inventoryService: InventoryService,
        private restaurantService: RestaurantService,
        private authenService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.curUser = this.authenService.getCurrentUser();
        this.restaurantService.getOwnerRestaurant(this.curUser.id).then(
        rest => {
            this.restaurantId = rest.id;
            if (this.restaurantId !== undefined) {
                this.loadAllProducts();
            }
        }
        );
    }

    confirmToDelete(item: Inventory) {
        this.toDeleteProd = item;
        $('#deleteConfirmDlg').modal('show');
      }

    private loadAllProducts() {
        this.inventoryService.getRestaurantIventories(this.restaurantId)
        .then(
            list => {
                // console.log(list);
                this.products = list;
            },
            error => {
                console.log(error);
                this.alertService.error('There is an error in loadding inventory', true);
            });
    }

    reloadAllProducts() {
        this.loadAllProducts();
    }

    inventoryAdd() {
        this.model.restaurantId = this.restaurantId;
        console.log(this.model);
        this.loading = true;

        this.inventoryService.create(this.model)
            .subscribe(
                data => {
                    console.log(data);
                    this.alertService.success('Product was added successfully', true);
                    this.loading = false;
                    this.reloadAllProducts();
                    this.resetAddingForm();
                },
                error => {
                    console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    enableAddingForm(show: any) {
        this.showAddForm = show;
        this.loading = false;
        this.inEditMode = false;
        $('#exampleModal').modal('show');
    }

    editProduct(prdId: any) {
        this.selectedProd = prdId;
        this.showAddForm = true;
        this.inEditMode = true;

        this.inventoryService.getById(prdId).then(
            data => {
                this.loading = false;
                console.log(data);
                this.model = data;
                $('#exampleModal').modal('show');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

    }

    updateProduct() {
        this.model.id = this.selectedProd;

        this.model.importDate = this.datePipe.transform(this.model.importDate, 'yyyy-MM-dd');
        this.model.expirationDate = this.datePipe.transform(this.model.expirationDate, 'yyyy-MM-dd');

        this.inventoryService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Product was updated successfully', true);
                    this.loading = false;
                    this.reloadAllProducts();
                    this.resetAddingForm();
                    $('#exampleModal').modal('hide');
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    $('#exampleModal').modal('hide');
                });
    }

    resetAddingForm() {
        this.model = {
            productName: '',
            importDate: new Date(),
            expirationDate:  new Date(),
            status: 1,
            total: 1,
            description: '',
            restaurantId: this.restaurantId,
        };
    }

    deleteInventory() {
        this.loading = true;
        console.log('the inventory to delete: ' + this.toDeleteProd.id);
        this.inventoryService.delete(this.toDeleteProd.id).subscribe(
          response => {
            const tmp = response.json();
            if (tmp.result === 1) {
              const index = this.products.indexOf(this.toDeleteProd);
              this.products.splice(index, 1);
            }
            this.loading = false;
            $('#deleteConfirmDlg').modal('hide');
          }
        );
    }
}
