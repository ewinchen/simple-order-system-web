import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  isEditMode: boolean;

  order: Order;

  constructor(private orderService: OrderService) {
    orderService.isEditMode$.subscribe(res => this.isEditMode = res);
    orderService.selectedOrder$.subscribe(res => this.order = res);
  }

  ngOnInit() {
  }

}
