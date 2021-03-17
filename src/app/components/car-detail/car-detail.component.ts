import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded=false;
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"] ){
       this.getCarDetail(params["id"])
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
  
  
}
