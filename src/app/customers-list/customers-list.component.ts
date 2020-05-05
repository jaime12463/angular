import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  customers : any[]= new Array <any>();
    constructor(private db: AngularFirestore) {
    //this.customers= db.collection('Customers').valueChanges();
    //console.log(this.customers);
   }

  ngOnInit() {
    //this.db.collection('Customers').valueChanges().subscribe(
    //  (item) => {
    //    this.customers=item;
    //    console.log(this.customers)
    //  }
    //)
    
    this.customers.length=0; 
    this.db.collection('Customers').get().subscribe(
      (Items)=> { 
       

        Items.docs.forEach((x)=>{
         let customer = x.data(); 
         customer.id=x.id;
         customer.ref=x.ref;
         this.customers.push(customer);
          } );


      }
    );
    

  }

}
