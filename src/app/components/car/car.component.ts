import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  brands:Brand[];
  colors:Color[];
  carFilterText="";
  brandFilterText="";
  colorFilterText="";

  constructor(private carService: CarService, private activatedRoute : ActivatedRoute, private brandService:BrandService, private colorService:ColorService) { }

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
