import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carForm : FormGroup;
  brands:Brand[];
  colors:Color[];
  currentCarId: number;
  operationType: string;
  car:Car

  imageAddForm:FormGroup;
  imageFiles:File[];
  savedCarId:number;

  
  constructor(private formBuilder:FormBuilder, 
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService, 
    private toastrService:ToastrService,
    // private carImageService:CarImageService,    
    private router: Router,
    private activetedRoute: ActivatedRoute
) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activetedRoute.params.subscribe((params) => {
      if (params['car']) {
        this.operationType = 'Update';
        this.createCarEditForm();
        this.getCar(params['car']);
        
      } else {
        this.operationType = 'Add';
        this.createCarAddForm();
    
      }
    });
    //this.createCarImageAddForm();
  }

  createCarEditForm() {
    this.carForm = this.formBuilder.group({
      id:[''],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createCarAddForm(){
     this.carForm = this.formBuilder.group({
       brandId:["",Validators.required],
       colorId:["",Validators.required],
       modelYear:["",Validators.required],
       dailyPrice:["",Validators.required],
       description:["",Validators.required]
     })
  }

  add(){
    if (this.carForm.valid) {
      let carModel = Object.assign({},this.carForm.value)
      this.carService.addCar(carModel).subscribe(response => {
        this.toastrService.success(response.message,"Successfully")
        // this.addImage()
        // this.toastrService.success("Image(s) added.","Successfully")
      },responseError => {
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası");
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Hata");
    }
  }

  update(){
    if (this.carForm.valid) {
      let carModel = Object.assign({}, this.carForm.value);
      carModel.id = this.currentCarId;
      this.carService.updateCar(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.success(responseError.message);
        }
      );
    } else {
      this.toastrService.error('Form eksik', 'Hata');
    }
  }

  
  

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors=response.data;
    })
  }

  getCar(car:number){
    this.currentCarId =car;
    this.carService.getCarById(car).subscribe(response => {
      this.carForm.patchValue({
        id:response.data.id,
        brandId: response.data.brandId,
        colorId:response.data.colorId,
        modelYear:response.data.modelYear,
        dailyPrice:response.data.dailyPrice,
        description:response.data.description,
    });
    console.log(this.currentCarId)
    });
  }

  // createCarImageAddForm(){
  //   this.imageAddForm = this.formBuilder.group({
  //     carId:[this.savedCarId],
  //     file:["",Validators.required]
  //   })
  // }

  // uploadFile(event:any){
  //   this.imageFiles = event.target.files;
  // }

  // addImage(){
  //   if (this.imageAddForm.valid) {
  //     for (let i = 0; i < this.imageFiles.length; i++) {
  //       this.carImageService.add(this.savedCarId,this.imageFiles[i]).subscribe(response => {
  //       }) 
  //     }
  //   }
  // }
}
