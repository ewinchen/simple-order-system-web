import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.orderService.isEditMode = false;
    this.orderService.orderList = [];
    this.orderService.orderDetail = undefined;
    this.orderService.orderListSelected = undefined;
  }
}
