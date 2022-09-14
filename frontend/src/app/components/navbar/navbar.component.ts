import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Apartment } from 'src/app/interfaces/apartment';
import { ApartmentsService } from 'src/app/services/apartments.service';
import { filter } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  localStorage = window.localStorage.length;
  citySearch = '';
  apartments :Apartment[]
  searchApartments

  userSignOut(){
    console.log('hi');

    localStorage.clear();
    window.location.reload();
  }

  signout(){
    this.router.navigate(['/home'])
    
  }

  constructor(private router: Router, private apartmentsService: ApartmentsService) {
    // apartmentsService.getAllApartments().subscribe(
    //   (res)=>{
    //     // res.filter((item: Customer) => {
    //     //   item[property].toLowerCase().includes(term.toLowerCase())
    //     //   })
    //     // }
    //     // console.log(res);
    //     this.apartments$ = res
    //   },(err)=>{
    //     console.log(err);
    //   }
    // )
    // this.strIntoObj =JSON.parse(this.apartments$)
    // console.log(this.apartments$);
    
  }

  ngOnInit(): void {
    this.apartmentsService.getAllApartments().subscribe(
      (apartment:any)=>{
        this.apartments = apartment
      },(err)=>{
        console.log(err);
      }
    )
    
   
  }


  onKey(){
    // const array = ['vanila', 'fruit', 'value', 'fulva'];
    // // const newArray = []
    // console.log(this.citySearch);
    

    // const newArray= array.filter( s =>s.includes(this.citySearch));

    // console.log(array);
    // console.log(newArray);

    // console.log("TYPES: ");
    

    // console.log("Array: " + typeof array);
    // console.log("newArray: " + typeof newArray);

    
    


    this.searchApartments = this.apartments.filter(apart => apart.city.includes(this.citySearch))
    console.log(this.searchApartments);

    
    // console.log("apart.city[0]: " + typeof this.apartments[0].city);
    // console.log("citySearch: " + typeof this.citySearch);
    // console.log("searchApartments array: " + typeof searchApartments);
    // console.log("apartments array: " + typeof this.apartments);

}

  


}
