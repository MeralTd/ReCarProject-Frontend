import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  // cars: Car[]=[];
  carImages:CarImage[]=[];
  car:Car;
  currentImage : CarImage;
  dataLoaded=false;
  imageBasePath = "https://localhost:44326/images/"

  minSelected:boolean;
  minDate:Date = new Date();
  rentTime:number;
  rentDate:Date;
  returnDate:Date;
  maxDate:Date = new Date();
  
  constructor(
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
      this.car = response.data[0]
      this.dataLoaded=true;
      console.log(response)
    })
  }
  
  getImagesByCarId(id:number){
    this.imageService.getCarImages(id).subscribe(response => {
      this.carImages=response.data;
    })
  }

  getCarImage(car:CarImage){
    if(car.imagePath){
      return car.imagePath
    }
    else{
      return 'default.jpg'
    }
  }
  
  selectMin(){
    this.minSelected = true;
    var date = new Date(this.rentDate);
    date.setDate(date.getDate() + 1);
    this.maxDate = date;
    this.minDate = this.rentDate;
  }

}
