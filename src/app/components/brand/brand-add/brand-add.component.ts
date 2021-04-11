import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  
  brandForm : FormGroup;
  brand:Brand
  currentBrandId: number;
  operationType: string;

  constructor(
    private formBuilder:FormBuilder, 
    private brandService:BrandService, 
    private toastrService:ToastrService,
    private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['brand']) {
        this.operationType = 'Update';
        this.createBrandUpdateForm();
        this.getBrand(params['brand']);

        
      } else {
        this.createBrandAddForm();
    
        this.operationType = 'Add';
      }
    });
  }

  createBrandAddForm(){
     this.brandForm = this.formBuilder.group({
       brandName:["",Validators.required]
     })
  }

  createBrandUpdateForm() {
    //this.currentBrandId = id;

    this.brandForm = this.formBuilder.group({
      brandId: [''],
      brandName: ['', Validators.required],
    });
  }

  add(){
    if(this.brandForm.valid){
      let brandModel = Object.assign({},this.brandForm.value)
      this.brandService.addBrand(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }

  update(){
    if (this.brandForm.valid) {
      let brandModel = Object.assign({}, this.brandForm.value);
      brandModel.id = this.currentBrandId
      this.brandService.updateBrand(brandModel).subscribe(
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

  getBrand(brand:number){
    this.currentBrandId = brand;
    this.brandService.getById(brand).subscribe(response => {
        this.brandForm.patchValue({
          brandId:response.data.brandId,
          brandName: response.data.brandName,
      });
      console.log(this.currentBrandId)
      });
  }

}