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

  cars: any[];

  cols: any[];

  selectedOrder;

  constructor(private orderServie: OrderService, private mainLayoutService: MainLayoutService) {
    orderServie.isEditMode$.subscribe(res => this.isEditMode = res);
  }

  ngOnInit() {

    this.cols = [
      { field: 'orderNo', header: 'Order No.' },
      { field: 'customer', header: 'Customer' },
      { field: 'createDate', header: 'Create Date' },
      { field: 'status', header: 'Status' }
    ];

    this.cars = [
      { orderNo: '001', customer: 'Microsoft', createDate: '2019-04-12', status: 'NEW' },
      { orderNo: '002', customer: 'Apple', createDate: '2019-04-12', status: 'SUBMITTED' },
      { orderNo: '003', customer: 'Amazon', createDate: '2019-04-12', status: 'NEW' },
      { orderNo: '004', customer: 'Google', createDate: '2019-04-12', status: 'NEW' },
      { orderNo: '005', customer: 'Facebook', createDate: '2019-04-12', status: 'NEW' },
      { orderNo: '006', customer: 'IBM', createDate: '2019-04-12', status: 'NEW' },
      { orderNo: '007', customer: 'Intel', createDate: '2019-04-12', status: 'NEW' },
      { orderNo: '008', customer: 'AMD', createDate: '2019-04-12', status: 'SUBMITTED' },
    ];
  }

  onRowUnselect($event) {
    setTimeout(() => {
      this.selectedOrder = $event.data;
    }, 1);
  }

  onRowSelect($event) {
    this.orderServie.selectedOrder$.next($event.data);
    this.mainLayoutService.isBlock$.next(true);
    setTimeout(() => {
      this.mainLayoutService.isBlock$.next(false);
    }, 300);
  }

}
