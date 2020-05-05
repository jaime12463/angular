import {DocumentReference} from '@angular/fire/firestore';
export class Pricing {
    id:string;
    name:string; 
    pricing: number;
    duration:number;
    durationType: number;
    ref: DocumentReference;
}