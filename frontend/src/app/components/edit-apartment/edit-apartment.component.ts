import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apartment } from 'src/app/interfaces/apartment';
import { ApartmentsService } from 'src/app/services/apartments.service';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrls: ['./edit-apartment.component.scss'],
})
export class EditApartmentComponent implements OnInit {
  form: FormGroup;
  file;
  formdata;

  constructor(
    private apartmentService: ApartmentsService,
    private router: Router
  ) {
    let apartmentId = JSON.parse(localStorage.getItem('apartmentId'));
    console.log(apartmentId);
    apartmentService.getApartment(apartmentId).subscribe((apartment: any) => {
      // console.log(apartment[0]);
      this.form.value.city = apartment[0].city;
      this.form.value.street = apartment[0].street;
      this.form.value.price = apartment[0].price;
      this.form.value.phone = apartment[0].phone;
      this.form.value.status = apartment[0].for_sale ? true : false;
      // if(apartment[0].for_sale==true){
      //   this.form.value.status = true
      // }else{
      //   this.form.value.status = false
      // };
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      city: new FormControl(null),
      street: new FormControl(null),
      price: new FormControl(null),
      status: new FormControl(null),
      phone: new FormControl(null),
    });
    // console.log(this.form);
  }

  async onSubmit() {
    // console.log("on submit " + this.apartment);const token = JSON.parse(localStorage.getItem('token'));
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token['id']);
    let apartmentId = JSON.parse(localStorage.getItem('apartmentId'));
    console.log(apartmentId);
    console.log(this.form.value.status);

    this.apartmentService
      .editApartment(
        apartmentId,
        this.form.value.city,
        this.form.value.street,
        this.form.value.price,
        this.form.value.status,
        this.form.value.phone
      )
      .subscribe(
        (response) => {
          console.log( "form status  " + this.form.value.status);
          this.form.value.status === "true" ? this.router.navigate(['/for-sale']) : this.router.navigate(['/for-rent']);
         
          // this.router.navigate(['/for-sale']);
          console.log(response);
          localStorage.removeItem('apartmentId');
          
        },
        (error) => {
          console.log('error caught in component ' + error);
        }
      );

      if (this.file) {
        this.apartmentService.fileEdit(this.formdata, apartmentId);
      }
  }

  onFileSelect(event: any) {
    this.file = event.target.files[0];

    this.formdata = new FormData();
    this.formdata.append('file', this.file);
  }

  
}
