import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app.setttings';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { DataSharingService } from '.';

// const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//       'Authorization': 'ctran'
//     })
//   };


@Injectable()
export class AuthenticationService {
    constructor(
        private http: Http,
        private httpClient: HttpClient,
        // private dataSharingService: DataSharingService,
    ) { }

    private baseURL = AppSettings.API_ENDPOINT;
    private getHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'ctran');
        return headers;
    }

    login(username: string, password: string) {
        return this.http.post(this.baseURL + '/login', { username: username, password: password }, { headers: this.getHeaders() })
            .map((response: Response) => {
                const res = response.json();
                if (res.result === 1) {
                    localStorage.setItem('currentUser', JSON.stringify(res.user));
                }
                return res;
            })
            .toPromise().then(data => {
                return data;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // this.dataSharingService.isUserLoggedIn.next(true);
    }

    public getCurrentUser(): any {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    }
}
