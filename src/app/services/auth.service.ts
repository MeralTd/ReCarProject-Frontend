import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper:JwtHelperService = new JwtHelperService();
  userName:string;
  userId:number;
  roles:string[];

  apiUrl = "https://localhost:44326/api/auth/"

  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) 
  {
    this.setUserId()
    this.setRoles();
  }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register", registerModel)
  }


  setUserId(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
      this.userId = Number(decoded[propUserId]);
    }
  }

  getUserId():number{
    return this.userId;
  }

  // changePassword(passwordChangeModel:PasswordChangeModel):Observable<ResponseModel>{
  //   return this.httpClient.post<ResponseModel>(environment.apiUrl + "auth/changepassword",passwordChangeModel);
  // }

  setRoles(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var role = Object.keys(decoded).filter(x => x.endsWith("/role"))[0];
      this.roles = (decoded[role])
    }
  }

  isAdmin(){
    if (this.roles.includes("admin")) {
      return true
    }
    return false;
  }

}
