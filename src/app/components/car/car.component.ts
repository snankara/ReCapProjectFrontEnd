import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  apiUrl = "https://localhost:44348/";
  cars:Car[] = [];
  carFilterText="";
  brandFilterText="";
  colorFilterText="";

  constructor(private carService: CarService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"] && params["colorId"]){
        this.getByBrandIdAndColorId(params["brandId"],params["colorId"]);
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"]);
      }
      else {
        this.getCars();
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.cars = response.data
    })
  } 

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
    })
  }

  getCarsByColorId(colorId:number){
    this.carService.getCarsByColorId(colorId).subscribe(response => {
      this.cars = response.data;
    })
  }


  getByBrandIdAndColorId(brandId:number,colorId:number){
    this.carService.getByBrandIdAndColorId(brandId,colorId).subscribe(response => {
      this.cars = response.data;
    })
  }

}
