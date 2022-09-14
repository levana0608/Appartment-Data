import { Component, OnInit } from '@angular/core';
import { Apartment } from 'src/app/interfaces/apartment';
import { ApartmentsService } from 'src/app/services/apartments.service';

@Component({
  selector: 'app-for-rent',
  templateUrl: './for-rent.component.html',
  styleUrls: ['./for-rent.component.scss'],
})
export class ForRentComponent implements OnInit {
  imageSrc: any;
  apartments: Apartment[];
  userID;
  isUSer = false;
  errorMessage: string;
  localStorage = window.localStorage.length;

  constructor(private apartmentService: ApartmentsService) {
    this.apartmentService.getApartmentRent().subscribe((apartment: any) => {
      this.apartments = apartment;
    });
  }

  deletApartment(apartment) {
    // this.userID = JSON.parse(localStorage.getItem('token'))['id'];

    if (apartment.userid === this.userID && confirm('Are you sure you want to delete the item? ')) {
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
    window.localStorage.setItem('apartmentId', apartment.idapartment);
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userID = JSON.parse(localStorage.getItem('token'))['id'];
      console.log(this.userID);
    }
  }
}
