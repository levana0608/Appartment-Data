import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageHeaderComponent } from './utils/page-header/page-header.component';
import { ForSaleComponent } from './components/for-sale/for-sale.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { HomeComponent } from './components/home/home.component';
import { ForRentComponent } from './components/for-rent/for-rent.component';
import { NewApartmentComponent } from './components/new-apartment/new-apartment.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { EditApartmentComponent } from './components/edit-apartment/edit-apartment.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageHeaderComponent,
    ForSaleComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForRentComponent,
    NewApartmentComponent,
    SafeHtmlPipe,
    EditApartmentComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularToastifyModule,
    ReactiveFormsModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
