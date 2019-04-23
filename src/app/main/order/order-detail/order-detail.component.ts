import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  isEditMode: boolean;

  orderForm: FormGroup;

  constructor(private orderService: OrderService, private formBuilder: FormBuilder, private utilService: UtilService) {
    orderService.isEditMode$.subscribe(res => this.isEditMode = res);
    orderService.orderDetail$.subscribe(res => {
      if (res) {
        const order = res as Order;
        this.orderForm = this.formBuilder.group({
          orderNo: [order.orderNo, Validators.required],
          createDate: [order.createDate],
          customer: [order.customer],
          goods: [order.goods],
          quantity: [order.quantity],
          unit: [order.unit],
          createBy: [order.createBy],
          submitBy: [order.submitBy],
          status: [order.status],
        });
        this.orderForm.valueChanges.subscribe(value => Object.assign(this.orderService.orderDetail$.getValue(), value));
      } else {
        this.orderForm = undefined;
      }
    });
  }

  ngOnInit() {
  }

}
