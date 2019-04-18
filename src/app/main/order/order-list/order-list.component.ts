import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { MainLayoutService } from '../../main-layout/main-layout.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  isEditMode;

  orderList: any[];

  cols = [
    { field: 'orderNo', header: 'Order No.' },
    { field: 'customer', header: 'Customer' },
    { field: 'createDate', header: 'Create Date' },
    { field: 'status', header: 'Status' }
  ];

  constructor(public orderService: OrderService, private mainLayoutService: MainLayoutService) {
    orderService.isEditMode$.subscribe(res => this.isEditMode = res);
    orderService.orderList$.subscribe(res => this.orderList = res);
  }

  ngOnInit() {
    this.orderService.fetchOrderList();
  }

  onRowUnselect($event) {
    setTimeout(() => {
      this.orderService.orderListSelected = $event.data;
    }, 1);
  }

  onRowSelect($event) {
    this.mainLayoutService.isBlock$.next(true);
    setTimeout(() => {
      this.orderService.fetchOrderDetail($event.data);
      this.mainLayoutService.isBlock$.next(false);
    }, 300);
  }

}
