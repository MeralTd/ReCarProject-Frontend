import { CarImage } from "./carImage";

export interface Car{
    id:number;
    brandName:string;
    colorName:string;
    brandId:number;
    colorId:number;
    modelYear:number;
    dailyPrice:number;
    description:string;
    imagePath:string;
    status:boolean;
}