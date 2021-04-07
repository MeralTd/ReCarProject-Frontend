import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = "https://localhost:44326/api/"

  constructor(private httpClient:HttpClient) { }
  
  saveCard(card:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cards/addcard";
    return this.httpClient.post<ResponseModel>(newPath,card);
  }

  getCardsByUserId(userId:number):Observable<ListResponseModel<Card>>{
    let newPath = this.apiUrl + "cards/getcardsbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  deleteCard(cardModel:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carddetails/delete";
    return this.httpClient.post<ResponseModel>(newPath,cardModel);
  }
}
