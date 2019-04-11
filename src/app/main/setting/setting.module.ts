import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SpecifyCustomerComponent } from './specify-customer/specify-customer.component';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,

  ],
  declarations: [SpecifyCustomerComponent]
})
export class SettingModule { }
