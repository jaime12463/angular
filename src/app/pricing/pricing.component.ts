import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore'
import { MessagesService } from '../services/messages.service';
import { Pricing } from '../models/pricing';
         
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})

export class PricingComponent implements OnInit {
  
  isNew :boolean=true; 
  formPricing : FormGroup
  listPricing : Array<Pricing>= new Array<Pricing>(); 
  pricingSeleted : Pricing;
  constructor(private fb:FormBuilder, 
              private db:AngularFirestore,
              private messageService : MessagesService) { }

  ngOnInit() {

  
    this.formPricing = this.fb.group({
      name: ['', Validators.required], 
      pricing : ['',Validators.required], 
      duration : ['', Validators.required],
      durationType : ['',Validators.required] 

    });
    this.loadPricing();
    
  }
  

  loadPricing(){
  
    this.listPricing=new Array<Pricing>();
    this.db.collection<Pricing>('Pricing').get().subscribe(
      (items) => {
        console.log(items);
        items.forEach(element => {
          let pricing:Pricing  = element.data() as Pricing; 
          pricing.id = element.id; 
          pricing.ref= element.ref;
          this.listPricing.push(pricing);
          
        });
        
      }
    )
  }
  
  save(){

    this.db.collection('Pricing').add(this.formPricing.value).then (
      (obj)=> {
        this.messageService.successMessage('Agredado', 'Precio agregado correctamente'); 
        this.formPricing.reset();
        this.loadPricing();
      }
    ).catch(
      (obj)=>{
        this.messageService.errorMessage('Error','Error a agregar precio')
      }
    );
  }

  edit(){
    
    this.db.doc(`Pricing/${this.pricingSeleted.id}`).update(this.formPricing.value).then(
      (obj)=> {
        this.messageService.successMessage('Actualizado','Precios actualizados')
        this.formPricing.reset();
        this.loadPricing();
      }
    ); 
    
  }

  editPricing ( pricing: Pricing){
    console.log(pricing);
  
    this.formPricing.setValue({
      name:pricing.name, 
      pricing: pricing.pricing, 
      duration:pricing.duration,
      durationType: pricing.durationType
    });

    this.pricingSeleted= pricing ; 
    this.isNew= false;
  }

}
