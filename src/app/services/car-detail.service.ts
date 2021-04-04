import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = "https://localhost:44326/api/"

  constructor(private httpClient:HttpClient) { }

  getCarDetail(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath =this.apiUrl+"cars/getcardetail?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
}
