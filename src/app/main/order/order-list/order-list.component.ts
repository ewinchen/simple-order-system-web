import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OrderService } from '../order.service';
import { MainLayoutService } from '../../main-layout/main-layout.service';
import { ErrorEntity } from 'src/app/shared/interceptor/error-interceptor';

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

  constructor(public orderService: OrderService, private layout: MainLayoutService) {
    orderService.isEditMode$.subscribe(res => this.isEditMode = res);
    orderService.orderList$.subscribe(res => this.orderList = res);
  }

  ngOnInit() {
    this.orderService.listOrder().subscribe(
      undefined,
      (err: ErrorEntity) => {
        alert(err.errMsg);
      }
    );
  }

  onRowUnselect($event) {
    setTimeout(() => {
      this.orderService.orderListSelected = $event.data;
    }, 1);
  }

  onRowSelect($event) {
    this.layout.isBlock$.next(true);
    this.orderService.getOrder($event.data.id).subscribe(
      () => this.layout.isBlock$.next(false),
      (err: ErrorEntity) => {
        alert(err.errMsg);
        this.layout.isBlock$.next(false);
      }
    );
  }

}
