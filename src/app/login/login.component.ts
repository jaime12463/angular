import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth, User } from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin : FormGroup;
  formIsValid : boolean =true;
  messageError: string="";
  constructor(private fb : FormBuilder,private afAuth :AngularFireAuth ,private spinner: NgxSpinnerService ) { }

  ngOnInit() {

    this.formLogin=this.fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.email
      ])], 
      password: ['', Validators.compose([
        Validators.required,Validators.minLength(8)
      ])]
    });

 
 
 

  }

  login ()
  {
    //debugger    
    
    if (this.formLogin.valid) {
      this.formIsValid =true;
      this.spinner.show();
      this.afAuth.auth.signInWithEmailAndPassword( this.formLogin.value.email , this.formLogin.value.password).then (
        (user)=> {
          this.spinner.hide();
        }
      ).catch( 
        (error) => {
          this.messageError=error.message;
          this.formIsValid=false;
          this.spinner.hide();
        } 
      ) ;
    }
    else {
      this.formIsValid=false;
      this.messageError='Favor de introducir los datos correctos!';
    }
   
  }

}
