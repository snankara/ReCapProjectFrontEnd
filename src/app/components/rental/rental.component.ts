import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {

  rentals:Rental[] = [];
  cars:Car[];
  customers:Customer[];
  carDetail:CarDetail={car:[],carImages:[]};
  @Input() car:Car;

  carId:number;
  customerId:number;
  rentDate:Date;
  returnDate:Date;

  minDate:string | any;
  maxDate:string | null
  maxMinDate:string | null;
  firstDateSelected:boolean = false; 

  constructor(private rentalService:RentalService, private customerService:CustomerService,
              private toastrService:ToastrService, private router:Router, private carService:CarService, private activatedRoute: ActivatedRoute,
              private carDetailService:CarDetailService,private datePipe:DatePipe
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.carId = params["carId"];
        this.getCar(params["carId"])
      }
    })
    this.getCustomers();
  }
  
getCar(carId:number){
  this.carDetailService.getCarDetails(carId).subscribe(response => {
    this.carDetail.car = response.data.car;
  })
}
  getRentals(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data; 
    })
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers =response.data
    })
  }

  checkRentableCar(){
    this.rentalService.getRentalByCarId(this.carId).subscribe(response => {
      if(response.data == null){
        this.createRental();
        return true;
      }

      let lastItem = response.data[response.data.length-1]
      let returnDate = new Date(lastItem?.returnDate);
      let rentDate = new Date(lastItem?.rentDate);
      if(rentDate > returnDate){
        return this.toastrService.error("Lütfen Girdiğiniz Bilgileri Kontrol Ediniz.")
      }

      this.createRental();
      return true;
    })
  }

  createRental(){
    let createdRental: Rental = {
      carId: this.carDetail.car[0].carId,
      customerId : this.customerId,
      carName: this.carDetail.car[0].carName,
      dailyPrice : this.carDetail.car[0].dailyPrice,
      rentDate : this.rentDate,
      returnDate : this.returnDate
    };
    if(createdRental.customerId == undefined || createdRental.rentDate == undefined){
      this.toastrService.error("Hata")
    }

    else {
      this.router.navigate(['/payment/', JSON.stringify(createdRental)])
      this.toastrService.info("Ödeme Sayfasına Yönlendiriliyorsunuz...")
    }
  }

  getRentMinDate(){
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate
  }

getReturnMinDate(){
  if(this.rentDate != undefined) {
    let stringToDate = new Date(this.rentDate)
    let newDate = new Date();
    newDate.setDate(stringToDate.getDate() + 1);
    return newDate.toISOString().slice(0,10)

  }else {
    return this.rentDate;

  }
}

getReturnMaxDate() {
  this.maxDate = this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),'yyyy-MM-dd');
  return this.maxDate;
}

  onChangeEvent(event:any){
    this.minDate = event.target.value;
    this.firstDateSelected = true
  }
}
