import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm : FormGroup
  cars:Car[] = [];
  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private carService:CarService, private activatedRoute : ActivatedRoute,
              private brandService:BrandService, private colorService: ColorService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"] && params["carName"]){ 
        this.getCarById(params["carId"]);
        this.createCarUpdateForm(params["carName"]);

      }
    })
    
    this.getBrands();
    this.getColors();
  }

  createCarUpdateForm(carName:string){
    this.carUpdateForm = this.formBuilder.group({
      carId : ["", Validators.required],
      carName : carName,
      brandId : ["", Validators.required],
      colorId : ["", Validators.required],
      modelYear : ["", Validators.required],
      dailyPrice : ["", Validators.required],
      description : ["", Validators.required]

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
  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response => {
      this.cars = response.data;
    })
  }

  updateCar(){
    console.log(this.carUpdateForm)
    if(this.carUpdateForm.valid){
      let carUpdateModel = Object.assign({},this.carUpdateForm.value)
      this.carService.carUpdate(carUpdateModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı !")
      },responseError => {
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası !")
            
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik","Dikkat !")
    }
  }

}
