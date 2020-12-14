import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/shared/service/util.service';
import { MainLayoutService } from '../../main-layout/main-layout.service';
import { ApiService, Res } from 'src/app/shared/service/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderForm: FormGroup;
  constructor(public orderService: OrderService,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private layout: MainLayoutService,
    private api: ApiService,
    private http: HttpClient) {

  }

  async renderForm(id?: number) {
    if (!id) {
      this.orderForm = this.formBuilder.group({
        id: [''],
        orderNo: ['', Validators.required],
        createDate: [''],
        customer: [''],
        goods: [''],
        quantity: [''],
        unit: [''],
        createBy: [''],
        submitBy: [''],
        status: [''],
      });
      return;
    }
    this.layout.isBlock$.next(true);
    try {
      const res = await this.orderService.getOrder(id);
      if (res.code !== this.api.sucessCode) {
        throw new Error(res.message);
      }
      const order: Order = res.data;

      this.orderForm = this.formBuilder.group({
        id: [order.id],
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

    } catch (error) {
      alert(error.message);
    } finally {
      this.layout.isBlock$.next(false);
    }

  }

  ngOnInit() {
  }

}
