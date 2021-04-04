import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import {CarDetail } from '../models/carDetail';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44326/api/"

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl +"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(id: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl +"cars/getbyid?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailbrandandcolorid?brandId=+" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  }

  getCarDetail(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getcardetail?carId='+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
