import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditApartmentComponent } from './components/edit-apartment/edit-apartment.component';
import { ForRentComponent } from './components/for-rent/for-rent.component';
import { ForSaleComponent } from './components/for-sale/for-sale.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewApartmentComponent } from './components/new-apartment/new-apartment.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'new-apartment', component: NewApartmentComponent },
  { path: 'edit-apartment', component: EditApartmentComponent },
  { path: 'for-sale', component: ForSaleComponent },
  { path: 'for-rent', component: ForRentComponent },
  { path: 'log-in', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
