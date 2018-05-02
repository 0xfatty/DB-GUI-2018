import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider, JwtInterceptor } from './_helpers';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import {
    AlertService, AuthenticationService, UserService, InventoryService, RestaurantService,
    MenuService, ReviewService, PostService, DataSharingService
} from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { InventoryComponent } from './inventory';
import { SidebarModule } from 'ng-sidebar';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './_services/in-memory-data.service';
import {
    RestaurantListComponent, RestaurantDetailComponent, RestaurantRatingComponent, RestaurantEditComponent,
    RestaurantReviewComponent, RestaurantMenuComponent, MyRestaurantComponent
} from './restaurant';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadService } from './_services/file-upload.service';
import { AccountEditComponent, UserListComponent, MyAccountComponent } from './user';
import { PostListComponent, NewsfeedComponent, PostEditComponent } from './post';
import { NavigationComponent } from './interface';
import { RestaurantManagementComponent } from './admin/restaurant-management/restaurant-management.component';

import { Sprint4Module } from './sprint4/sprint4.module';
import { AccountRepostitory } from '../app/domain/account-info-repository.service';
import { RestaurantCreateComponent } from './restaurant/restaurant-create/restaurant-create.component';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        SidebarModule.forRoot(),
        Sprint4Module,
        FormsModule,
        HttpModule,
        routing,
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, { dataEncapsulation: false }
        )

    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        InventoryComponent,
        RestaurantListComponent,
        RestaurantDetailComponent,
        RestaurantReviewComponent,
        RestaurantRatingComponent,
        RestaurantMenuComponent,
        RestaurantEditComponent,
        FileUploadComponent,
        AccountEditComponent,
        UserListComponent,
        PostListComponent,
        PostEditComponent,
        NewsfeedComponent,
        MyAccountComponent,
        MyRestaurantComponent,
        NavigationComponent,
        RestaurantManagementComponent,
        RestaurantCreateComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        MenuService,
        PostService,
        ReviewService,
        RestaurantService,
        FileUploadService,
        DataSharingService,
        AccountRepostitory,
        InventoryService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
