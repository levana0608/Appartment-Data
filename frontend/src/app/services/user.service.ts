import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { Subscription, throwError } from 'rxjs';
// import { ServerResponse } from 'node:http';
import { catchError, first } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  rootURL = '/api';
  isUserLoggedIn: boolean = false;
  constructor(private http: HttpClient) {
    //   let headers = new Headers({ 'Content-Type': 'application/json' });
    //   let options = new Req({ headers: headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error);
      return throwError(
        'Something bad happened, please try again later: ' + error.error
      );
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return throwError(error.error);
    }
  }


  addUser(name: string, email: string, password: string) {
    // const headers = new HttpHeaders()
    // // .set('Authorization', 'my-auth-token')
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.rootURL + '/add-user', JSON.stringify({name, email, password}),{headers:headers})

    return this.http
      .post(
        this.rootURL + '/add-user',
        { name, email, password },
        {
          responseType: 'text',
        }
      )
      .pipe(catchError(this.handleError));
  }

  logInUser(email: string, password: string) {
    // const headers = new HttpHeaders()
    // // .set('Authorization', 'my-auth-token')
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.rootURL + '/add-user', JSON.stringify({name, email, password}),{headers:headers})

    return this.http
      .post(
        this.rootURL + '/connect',
        { email, password },
        {
          responseType: 'text',
        }
      )
      .pipe(catchError(this.handleError));
  }
  //localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

  // searchUser(email: string) {
  //   return this.http.get(this.http + 'log-in');
  // }
}
