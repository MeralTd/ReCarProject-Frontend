import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars: Car[]=[];
  carImages:CarImage[]=[];
  currentImage : CarImage;
  dataLoaded=false;
  imageBasePath = "https://localhost:44326/images/"
  carImageDefault= "https://localhost:44326/images/default.jpg"


  constructor(
    private carDetailService:CarDetailService,
    private carService:CarService,
    private imageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"] ){
       this.getCarDetail(params["id"])
       this.getImagesByCarId(params["id"])
      }

  })
  }
 
  getCarDetail(id:number){
    this.carService.getCarDetail(id).subscribe((response) =>{
      this.cars = response.data
      this.dataLoaded=true;
      console.log(response)
    })
  }
  
  getImagesByCarId(id:number){
    this.imageService.getCarImages(id).subscribe(response => {
      this.carImages=response.data;
    })
  }

  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(image:CarImage){
    if(image==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }
  
}
