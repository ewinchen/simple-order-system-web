import { Component, OnInit, OnDestroy } from '@angular/core';
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
    this.orderService.isEditMode$.next(false);
    this.orderService.orderList$.next(undefined);
    this.orderService.orderDetail$.next(undefined);
    this.orderService.orderListSelected = undefined;
  }
}
