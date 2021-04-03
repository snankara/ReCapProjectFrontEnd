import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"brands", component:CarComponent},
  {path:"filters/brandId/:brandId/colorId/:colorId", component:CarComponent},
  {path:"brands/brand/:brandId", component:CarComponent},
  {path:"brands/brand/:brandId/cardetail/car/:carId", component:CarDetailComponent},
  {path:"colors", component:CarComponent},
  {path:"colors/color/:colorId", component:CarComponent},
  {path:"colors/color/:colorId/cardetail/car/:carId", component:CarDetailComponent},
  {path:"brands/cardetail/car/:carId", component:CarDetailComponent},
  {path:"cardetail/car/:carId", component:CarDetailComponent},
  {path:"colors/cardetail/car/:carId", component:CarDetailComponent},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"rental/car/:carId",component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
