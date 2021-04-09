import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/details/:id",component:CarDetailComponent},

  {path:"cars/filter/brand/:brandId",component:CarComponent},
  {path:"cars/filter/color/:colorId",component:CarComponent},
  {path:"cars/filter/brand/:brandId/color/:colorId",component:CarComponent},

  {path:"rental/:id", component:RentalComponent},
  {path:"payment/:rental",component:PaymentComponent},

  {path:"brands/add", component:BrandAddComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"cars/update/:car",component:CarAddComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
