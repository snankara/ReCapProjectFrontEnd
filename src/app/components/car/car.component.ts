import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  apiUrl ="https://localhost:44348"
  cars:Car[] = [];
  brands:Brand[];
  colors:Color[];
  carDetail:CarDetail[] = [];
  carFilterText="";
  brandFilterText="";
  colorFilterText="";

  constructor(private carService: CarService, private router:Router ,private activatedRoute : ActivatedRoute, private brandService:BrandService, private colorService:ColorService) { }

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
      this.getBrands();
      this.getColors();
    })

    
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    }) 
  }

  getColors(){
  this.colorService.getColors().subscribe(response => { 
    this.colors = response.data
  })
  }
  getCars(){
    this.carService.getCarAndImageDetails().subscribe(response => {
      this.carDetail = response.data
      console.log(this.carDetail[2].imagePath)

    })
  } 

  getCarsByBrand(brandId:number){
    this.carService.getCarAndImageDetailsByBrandId(brandId).subscribe(response => {
      this.carDetail = response.data;

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

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

}
