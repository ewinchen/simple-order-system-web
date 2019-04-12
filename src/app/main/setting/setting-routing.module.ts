import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecifyCustomerComponent } from './specify-customer/specify-customer.component';

const routes: Routes = [
  {
    path: 'customer',
    component: SpecifyCustomerComponent,
    data: { menuName: 'Customer' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
