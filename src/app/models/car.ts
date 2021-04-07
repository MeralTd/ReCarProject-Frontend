import { CarImage } from "./carImage";

export interface Car{
    id:number;
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string;
    imagePath:string;
    status:boolean;
}