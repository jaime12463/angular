import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { PricingComponent } from './pricing/pricing.component';
import { InscriptionComponent } from './inscription/inscription.component';


const routes: Routes = [
  {path: '' , redirectTo: 'inscription', pathMatch:'full'},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'customers' , component: CustomersListComponent},
  {path: 'add-customers' , component: AddCustomerComponent},
  {path: 'add-customers/:customerID' , component: AddCustomerComponent},
  {path: 'precios', component:PricingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
