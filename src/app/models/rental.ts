export interface Rental{
    rentalId?:number;
    carId:number;
    brandName : string;
    colorName:string;
    carDailyPrice : number;
    carDescription : string;
    customerId : number;
    rentDate : Date;
    returnDate:Date;
}

// export interface Rental{
//     rentalId:number;
//     carId:number;
//     customerId:number;
//     firstName:string;
//     lastName:string;
//     companyName:string;
//     rentDate:Date;
//     returnDate:Date;
// }