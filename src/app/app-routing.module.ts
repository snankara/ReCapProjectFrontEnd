import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent,},
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
  {path:"rental/car/:carId",component:RentalComponent},
  {path:"car/add", component:CarAddComponent},
  {path:"brand/add", component:BrandAddComponent},
  {path:"color/add", component:ColorAddComponent},
  {path:"car/update/:carName/:carId", component:CarUpdateComponent},
  {path:"brand/update/:brandId", component:BrandUpdateComponent},
  {path:"color/update/:colorId", component:ColorUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
