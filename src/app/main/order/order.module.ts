import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderActionComponent } from './order-action/order-action.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [OrderComponent, OrderActionComponent, OrderListComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,

    SharedModule
  ]
})
export class OrderModule { }
