import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UtilService } from 'src/app/shared/service/util.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/service/api.service';

export interface Order {
  id?: number;
  orderNo: string;
  createDate: Date | string;
  customer: string;
  goods: string;
  quantity: number;
  unit: string;
  createBy: string;
  submitBy: string;
  status: string;
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // 基本数据类型是值传递
  basicType$ = new BehaviorSubject('Hello');

  // 对象是引用传递
  objectType$ = new BehaviorSubject({ a: 1, b: '2' });

  isEditMode = false;

  orderList = [];

  orderFilter$ = new BehaviorSubject({
    beginDate: null,
    endDate: null,
    orderNo: null,
    customer: null,
    createBy: null,
    status: 'NEW',
  });

  orderListSelected: any;

  orderDetail: Order;

  orderSearchEmitter$ = new Subject();

  constructor(private util: UtilService, private http: HttpClient, private api: ApiService) { }

  getOrder(id) {
    return this.http.get<any>(`${this.api.proxyBackendApi}/order/getOrder/${id}`).toPromise();
  }

  listOrder() {
    return this.http.get<any>(`${this.api.proxyBackendApi}/order/listOrder`).toPromise();
  }

  searchOrder(condtion) {
    return this.http.post<any>(`${this.api.proxyBackendApi}/order/searchOrder`, condtion).toPromise();
  }

  updateOrder(data) {
    return this.http.post<any>(`${this.api.proxyBackendApi}/order/updateOrder`, data).toPromise();
  }

  createOrder(order) {
    return this.http.post<any>(`${this.api.proxyBackendApi}/order/createOrder`, order).toPromise();
  }
}
