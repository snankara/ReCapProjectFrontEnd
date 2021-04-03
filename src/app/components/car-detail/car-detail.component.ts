import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  apiUrl ="https://localhost:44348"
  carDetail:CarDetail={car:[],carImages:[]};
  rental:Rental[] = [];
  
  constructor(private carDetailService:CarDetailService, private activatedRoute:ActivatedRoute,private rentalService:RentalService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){ 
        this.getCarDetail(params["carId"]);
        this.getRentalByCarId(params["carId"]) 
      }
    })
  }

  getCarDetail(carId:number){
    this.carDetailService.getCarDetails(carId).subscribe(response => {
      this.carDetail = response.data
    })
  }

  getRentalByCarId(carId:number){
    this.rentalService.getRentalByCarId(carId).subscribe(response => {
      this.rental = response.data 
      //  if(item == null){
      //   this.toastrService.error("Araç Henüz Teslim Edilmemiş !");
      // }
    })
  }
  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  getButtonClassName(){
    if(this.carDetail.car[0]?.status == true){
      return "btn btn-outline-primary";
    }
    else {
      return "btn btn-outline-primary disabled"
    }
    
  }
}
