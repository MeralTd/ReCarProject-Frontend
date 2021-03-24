import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetail[] = [];
  currentCar:Car;
  imageBasePath = "https://localhost:44326/images/"

  dataLoaded = false;

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;

    })
  }


  getCarsByBrand(brandId:number) {
    this.carService.getCarByBrand(brandId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;

    })
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarByColor(colorId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;

    })
  }

  getCarImage(car:Car){

    if(car.imagePath){
      return car.imagePath
    }
    else{
      return 'default.jpg'
    }
  }
}
