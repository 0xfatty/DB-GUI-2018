import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { InventoryComponent } from './inventory';
import { AuthGuard } from './_guards';
import { RestaurantListComponent, RestaurantDetailComponent, RestaurantEditComponent, MyRestaurantComponent } from './restaurant';
import { AccountEditComponent, UserListComponent, MyAccountComponent } from './user';
import { PostListComponent, NewsfeedComponent } from './post';
import { RestaurantManagementComponent } from './admin';
import { RestaurantCreateComponent } from './restaurant/restaurant-create/restaurant-create.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
    { path: 'restaurant/:id', component: RestaurantDetailComponent},
    { path: 'restaurant/edit/:id', component: RestaurantEditComponent, canActivate: [AuthGuard] },
    { path: 'restaurant', component: RestaurantListComponent},
    { path: 'restaurants', component: RestaurantManagementComponent},
    { path: 'my-restaurant', component: MyRestaurantComponent, pathMatch: 'full' },
    { path: 'my-restaurant/create-new', component: RestaurantCreateComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
    { path: 'newsfeed', component: NewsfeedComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'user/edit/:id', component: AccountEditComponent, canActivate: [AuthGuard] },
    { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
