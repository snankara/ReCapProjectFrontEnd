import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  apiUrl ="https://localhost:44348"
  carDetail:CarDetail[] = [];
  rental:Rental[] = [];
  customer:Customer[]=[]
  user:User

  constructor(private carService:CarService, 
              private activatedRoute:ActivatedRoute,
              private rentalService:RentalService, 
              private userService:UserService, private customerService:CustomerService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){ 
        this.getCarDetail(params["carId"]);
        this.getRentalByCarId(params["carId"]) 
      }
    })
    let email = localStorage.getItem("email")
    this.getUserByMail(email == null ? email = "": email.toString())
  }


  getUserByMail(email:string){
    this.userService.getUserByMail(email).subscribe(response => {
      this.user = response.data;
    })
  }

  getCustomerById(customerId:number){
    this.customerService.getCustomerById(customerId).subscribe(response => {
      this.customer = response.data;

    })
  }
  getCarDetail(carId:number){
    this.carService.getCarAndImageDetailsByCarId(carId).subscribe(response => {
      this.carDetail = response.data

    })
  }

  getRentalByCarId(carId:number){
    this.rentalService.getRentalByCarId(carId).subscribe(response => {
      this.rental = response.data 
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
    if(this.carDetail[0]?.status == true){
      return "btn btn-outline-primary";
    }
    else {
      return "btn btn-outline-primary disabled"
    }
    
  }
}
