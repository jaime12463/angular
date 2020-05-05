import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AngularFireModule } from '@angular/fire';;
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgxSpinnerModule }  from 'ngx-spinner';
import { HeaderComponent } from './header/header.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { PricingComponent } from './pricing/pricing.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { SelectCustomerComponent } from './select-customer/select-customer.component';



//import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CustomersListComponent,
    AddCustomerComponent,
    PricingComponent,
    InscriptionComponent,
    SelectCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule, 
    ProgressbarModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
