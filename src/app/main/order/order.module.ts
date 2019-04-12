import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderActionComponent } from './order-action/order-action.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrderComponent, OrderActionComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,

    SharedModule
  ]
})
export class OrderModule { }
