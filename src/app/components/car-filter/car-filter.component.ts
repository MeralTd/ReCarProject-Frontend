import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands: Brand[] = [];
  colors: Color[] = [];
  brandIdFilter : number;
  colorIdFilter : number;

  constructor(
    private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getRouterLink(){
    if(this.brandIdFilter && this.colorIdFilter){
      return "/cars/filter/brand/"+this.brandIdFilter+"/color/"+this.colorIdFilter;
    }else if(this.brandIdFilter){
      return "/cars/filter/brand/"+this.brandIdFilter;
    }else if(this.colorIdFilter){
      return "/cars/filter/color/"+this.colorIdFilter;
    }else{
      return "/cars";
    }
  }
  getBrands(){
    this.brandService.getBrands().subscribe(respone => {
      this.brands = respone.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  IsCurrentBrandNull(){
    if(this.brandIdFilter){
      return true;
    }else{
      return false;
    }
  }
  getSelectedBrand(brandId:number){
    if (this.brandIdFilter == brandId) {
      return true;
    } else {
      this.brandIdFilter == -1
      return this.brandIdFilter;
    }
  }

  IsCurrentColorNull(){
    if(this.colorIdFilter){
      return true;
    }else{
      return false;
    }
  }

  getSelectedColor(colorId:number){
    if (this.colorIdFilter == colorId) {
      return true;
    } else {
      return false;
    }
  }
}
