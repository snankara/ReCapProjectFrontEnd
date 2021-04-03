import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44348/api/";

  constructor(private httpClient : HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  } 
  getByBrandIdAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrandidandcolorid?brandId=" + brandId + "&" + "colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  } 

}
