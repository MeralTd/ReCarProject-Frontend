// export interface Card{
//     cardId:number;
//     userId:number;
//     firstName:string;
//     lastName:string
//     cvv:number;
//     expirationDate:string;
//     cardNumber:string;
// }

export interface Card{
    cardId? : number;
    nameOnTheCard : string;
    cardNumber : string;
    cardCvv:string;
    expirationDate : string;
    moneyInTheCard? : number;
}