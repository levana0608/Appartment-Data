import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Apartment } from 'src/app/interfaces/apartment';
import { ApartmentsService } from 'src/app/services/apartments.service';
// import path from '../../../../../backend/images';

@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.scss'],
})
export class ForSaleComponent implements OnInit {
  imageSrc: any;
  apartments: Apartment[];
  userID;
  errorMessage: string;
  localStorage = window.localStorage.length;
  user = false;

  constructor(
    private apartmentService: ApartmentsService
  ) {
    this.apartmentService.getApartmentSale().subscribe((apartment: any) => {
      this.apartments = apartment;
    });
  }

  deletApartment(apartment) {
    // this.userID = JSON.parse(localStorage.getItem('token'))["id"];
    // console.log(localStorage);
    // alert("are you sure?")
    if (apartment.userid === this.userID && confirm('Are you sure you want to delete the item? ')) {
      console.log(apartment.img_src);

      this.apartmentService
        .deleteUserApartment(apartment.idapartment)
        .subscribe(
          (response) => {
            console.log(response);
          },
          (err) => {
            console.log('error deleted ' + err);
          }
        );
      window.location.reload();
    }
  }

  editApartment(apartment) {
    console.log(this.apartments);
    
    window.localStorage.setItem('apartmentId', apartment.idapartment);
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.userID = JSON.parse(localStorage.getItem('token'))['id'];
      console.log(this.userID);
    }

  }
}
