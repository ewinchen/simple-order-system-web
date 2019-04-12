import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  isEditMode: boolean;

  constructor(private orderService: OrderService) {
    orderService.isEditMode$.subscribe(res => this.isEditMode = res);
  }

  ngOnInit() {
  }

}
