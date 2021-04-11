import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder, 
    private colorService:ColorService, private toastrService:ToastrService, 
    private activetedRoute: ActivatedRoute) { }

    colorForm : FormGroup;
    color:Color
    currentColorId: number;
    operationType: string;
  
  
    ngOnInit(): void {
      this.activetedRoute.params.subscribe((params) => {
        if (params['color']) {
          this.operationType = 'Update';
          this.createColorUpdateForm();
          this.getColor(params['color']);
  
          
        } else {
          this.createColorAddForm();
      
          this.operationType = 'Add';
        }
      });
    }
  
    createColorAddForm(){
       this.colorForm = this.formBuilder.group({
         colorName:["",Validators.required]
       })
    }
  
    createColorUpdateForm() {
      //this.currentcolorId = id;
  
      this.colorForm = this.formBuilder.group({
        colorId: [''],
        colorName: ['', Validators.required],
      });
    }
  
    add(){
      if(this.colorForm.valid){
        let colorModel = Object.assign({},this.colorForm.value)
        this.colorService.addColor(colorModel).subscribe(response=>{
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
      if (this.colorForm.valid) {
        let colorModel = Object.assign({}, this.colorForm.value);
        colorModel.id = this.currentColorId
        this.colorService.updateColor(colorModel).subscribe(
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
  
    getColor(color:number){
      this.currentColorId = color;
      this.colorService.getById(color).subscribe(response => {
          this.colorForm.patchValue({
            colorId:response.data.colorId,
            colorName: response.data.colorName,
        });
        console.log(this.currentColorId)
        });
    }

}
