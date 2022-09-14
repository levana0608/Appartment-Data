import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { catchError } from 'rxjs/operators';
import { Apartment } from '../interfaces/apartment';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  rootURL = '/api';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(
        'Something bad happened, please try again later: ' + error.error
      );
    } else {
      return throwError(error.error);
    }
  }

  getAllApartments(){
    return this.http.get(this.rootURL + '/all-apartments')
    // .pipe(catchError(this.handleError))
  }

  getApartmentSale(): Observable<Apartment> {
    return this.http.get<Apartment>(this.rootURL + '/apartment-sale');
    // .pipe(catchError(this.handleError));
  }

  getApartmentRent(): Observable<Apartment> {
    return this.http.get<Apartment>(this.rootURL + '/apartment-rent');
    // .pipe(catchError(this.handleError));
  }

  getImage() {
    return this.http
      .get(this.rootURL + '/image')
      .pipe(catchError(this.handleError));
  }

  deleteUserApartment(idapartment: any) {
    return this.http
      .delete(this.rootURL + '/apartment-delete/' + idapartment, {
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  getApartment(idapartment) {
    return this.http.get(this.rootURL + '/getApartment/' + idapartment);
    // .pipe(catchError(this.handleError));
  }

  editApartment(
    idapartment: any,
    city: string,
    street: string,
    price: number,
    status: boolean,
    phone: string
  ) {
    return this.http
      .put(
        this.rootURL + '/apartment-edit/' + idapartment,
        { city, street, price, status, phone },
        {
          responseType: 'text',
        }
      )
      .pipe(catchError(this.handleError));
  }

  addApartment(
    city: string,
    street: string,
    price: number,
    status: boolean,
    phone: string,
    userid: number
  ) {
    return this.http
      .post(
        this.rootURL + '/apartment',
        { city, street, price, status, phone, userid },
        { responseType: 'text' }
      )
      .pipe(catchError(this.handleError));
  }

  fileAdd(formdata) {
    return this.http.post(this.rootURL + '/file', formdata).subscribe(
      (d) => {
        console.log(d);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fileEdit(formdata, idapartment: any) {
    return this.http.post(this.rootURL + '/fileEdit/'  + idapartment, formdata).subscribe(
      (d) => {
        console.log(d);
      },
      (error) => {
        console.error(error);
      }
    );
  }




}
