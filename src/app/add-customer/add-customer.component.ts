import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage  } from 'angularfire2/storage';
import { AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore'
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../services/messages.service';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  formAddCustomer : FormGroup;
  percentage : number=0; 
  urlFile :string='';
  isNew : boolean = true;
  id : string;
  //private itemsCollection: AngularFirestoreCollection<Item>;
  constructor(
    private fb: FormBuilder, 
    private storage : AngularFireStorage, 
    private db:AngularFirestore,
    private activeRoute: ActivatedRoute,
    private messageService : MessagesService) { }

  ngOnInit() {


    this.formAddCustomer=this.fb.group({
      birthDate : ['',Validators.required],
      name: ['', Validators.required],
      lastName: ['',Validators.required],
      email: ['', Validators.compose(
        [Validators.required,Validators.email]
      )],
      rfc: [''],
     
      phone: ['', Validators.required], 
      url : ['']
      
    });

     this.id=this.activeRoute.snapshot.params.customerID 
    if (this.id != undefined)
    {
    this.db.doc<any>(`Customers/${this.id}`).valueChanges().subscribe(
        (customer)=> { 
          this.urlFile = customer.url;
          customer.url='';
          console.log(customer);
          console.log(customer.birthDate);
          customer.birthDate=new Date(customer.birthDate.seconds * 1000).toISOString().substring(0,10) ;
          
          this.formAddCustomer.setValue(customer);
          this.isNew=false;
        }
      );
      
    } 

  }

  uploadImagen (event:any){
    

    this.urlFile=""; 
    this.percentage=0;
    if (event.target.files.length > 0 )
    {
      let imagenName = new Date().getTime().toString();
      let file =event.target.files[0]; 
      file.name.toString().substring(file.name.toString().lastIndexOf())
      let fileType = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      let filePath = `clientes/${imagenName}${fileType}`;
      const ref = this.storage.ref(filePath);
      const task =ref.put(file); 
      //let task = this.storage.upload(filePath, file);
      task.then(
        (obj) => {
          ref.getDownloadURL().subscribe(
            (url) => {
              this.urlFile =url;
            }
          )
        }
      )
      task.percentageChanges().subscribe(
        (por)=>{ 
          this.percentage= parseInt(por.toString())
        }
      );
      }
      

    

    }

    add(){

      this.formAddCustomer.value.url = this.urlFile; 
      this.formAddCustomer.value.birthDate=new Date(this.formAddCustomer.value.birthDate);
      console.log(this.formAddCustomer.value.birthDate);
      
      this.db.collection('Customers').add(this.formAddCustomer.value).then(
        (obj)=> {
          console.log("Registro creado exitosamente")
          //alert ('Cliente registrado exitosamentes')
          this.messageService.successMessage('Agredado', 'Cliente agregado correctamente'); 
           
          this.formAddCustomer.reset();
          this.urlFile=''
          this.percentage=0;
        }
      ); 

  }

  update(){
    this.formAddCustomer.value.url = this.urlFile; 
    this.formAddCustomer.value.birthDate=new Date(this.formAddCustomer.value.birthDate);
    console.log(this.formAddCustomer.value.birthDate);
    this.db.doc(`Customers/${this.id}` ).update(this.formAddCustomer.value).then(
      (obj)=> {
        console.log("Registro actualizado exitosamente")
        this.formAddCustomer.reset();
        this.urlFile=''
        this.percentage=0;
      }
    ).catch(
      (error)=> console.log(error)
    ).finally(
      ()=> {
        this.messageService.successMessage('Editar','Cliente editado correctamente');
      }
    ); 
  }

}
