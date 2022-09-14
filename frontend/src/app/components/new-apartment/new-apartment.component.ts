import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apartment } from 'src/app/interfaces/apartment';
import { ApartmentsService } from 'src/app/services/apartments.service';

@Component({
  selector: 'app-new-apartment',
  templateUrl: './new-apartment.component.html',
  styleUrls: ['./new-apartment.component.scss'],
})
export class NewApartmentComponent implements OnInit {
  form: FormGroup;
  file;
  formdata;

  constructor(
    private apartmentService: ApartmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      city: new FormControl(null),
      street: new FormControl(null),
      price: new FormControl(null),
      status: new FormControl(null),
      phone: new FormControl(null),
    });
  }

  onFileSelect(event: any) {
    this.file = event.target.files[0];

    this.formdata = new FormData();
    this.formdata.append('file', this.file);
  }

  async onSubmit() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token['id']);

    const apartment: Apartment = {
      city: this.form.value.city,
      street: this.form.value.street,
      price: this.form.value.price,
      status: this.form.value.status,
      phone: this.form.value.phone,
      userId: token['id'],
    };

    await this.apartmentService
      .addApartment(
        apartment.city,
        apartment.street,
        apartment.price,
        apartment.status,
        apartment.phone,
        apartment.userId
      )
      .subscribe(
        (response) => {
          console.log('added apartment success!' + response);
        },
        (error) => {
          console.log('error caught in component ' + error);
        }
      );

    if (this.file) {
      this.apartmentService.fileAdd(this.formdata);
    }

    if (this.form.value.status === "true") {
      this.router.navigate(['/for-sale']);
    } else {
      this.router.navigate(['/for-rent']);
      
    }
  }
}
