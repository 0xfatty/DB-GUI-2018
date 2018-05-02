import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let products: any[] = JSON.parse(localStorage.getItem('products')) || [];

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // create user
            if (request.url.endsWith('/api/users') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;
				console.log(newUser);
				
                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return Observable.throw('Username "' + newUser.username + '" is already taken');
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }
			
			//update user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'PUT') {
                // get new product object from post body
                let updatedUser = request.body;

                // validation
                let curUser = users.filter(usr => { return (usr.username === updatedUser.username && usr.id !== updatedUser.id); }).length;
                if (curUser) {
                    return Observable.throw('Username "' + updatedUser.username + '" is already taken');
                }

                // save new product
                users.forEach(function(p) {
				   if(p.id === updatedUser.id){ 
						p.username = updatedUser.username;
						p.firstName = updatedUser.firstName;
						p.lastName = updatedUser.lastName;
						p.password = updatedUser.password;
						p.email = updatedUser.email;
				   }
				});
				
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }
			
            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }
			
			// create product
            if (request.url.endsWith('/api/inventories') && request.method === 'POST') {
                // get new product object from post body
                let newProduct = request.body;

                // validation
                let duplicateProduct = products.filter(prod => { return prod.productName === newProduct.productName; }).length;
                if (duplicateProduct) {
                    return Observable.throw('productName "' + newProduct.productName + '" is already taken');
                }

                // save new product
                newProduct.id = products.length + 1;
                products.push(newProduct);
                localStorage.setItem('products', JSON.stringify(products));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

			// update product
            if (request.url.match(/\/api\/inventories\/\d+$/) && request.method === 'PUT') {
                // get new product object from post body
                let updatedProd = request.body;

                // validation
                let curProduct = products.filter(prod => { return (prod.productName === updatedProd.productName && prod.id !== updatedProd.id); }).length;
                if (curProduct) {
                    return Observable.throw('productName "' + updatedProd.productName + '" is already taken');
                }

                // save new product
                products.forEach(function(p) {
				   if(p.id === updatedProd.id){ 
						p.productName = updatedProd.productName;
						p.importDate = updatedProd.importDate;
						p.expirationDate = updatedProd.expirationDate;
						p.status = updatedProd.status;
						p.total = updatedProd.total;
						p.description = updatedProd.description;
				   }
				});
				
                localStorage.setItem('products', JSON.stringify(products));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }
			
			// get product by id
            if (request.url.match(/\/api\/inventories\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return product if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find product by id in products array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedProducts = products.filter(product => { return product.id === id; });
                    let product = matchedProducts.length ? matchedProducts[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: product }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

			// delete product
            if (request.url.match(/\/api\/inventories\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return product if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find product by id in products array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < products.length; i++) {
                        let prod = products[i];
                        if (prod.id === id) {
                            // delete product
                            products.splice(i, 1);
                            localStorage.setItem('products', JSON.stringify(products));
                            break;
                        }
                    }

                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }
			
			
            // get products
            if (request.url.endsWith('/api/inventories') && request.method === 'GET') {
                // check for fake auth token in header and return products if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: products }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }
			
            // pass through any requests not handled above
            return next.handle(request);
            
        })

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};