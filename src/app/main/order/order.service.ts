import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from 'src/app/shared/service/util.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface Order {
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

// tslint:disable: max-line-length
const orderDetailData: Order[] = [
  { orderNo: '001', customer: 'Microsoft', createDate: '2019-04-12', goods: 'Windows 10', quantity: 10, unit: 'set', createBy: 'admin', submitBy: 'admin', status: 'NEW' },
  { orderNo: '002', customer: 'Apple', createDate: '2019-04-13', goods: 'iPone X MAX', quantity: 10, unit: 'set', createBy: 'admin', submitBy: 'admin', status: 'SUBMITTED' },
  { orderNo: '003', customer: 'Amazon', createDate: '2019-04-12', goods: 'AWS EC2', quantity: 10, unit: 'set', createBy: 'admin', submitBy: 'admin', status: 'NEW' },
  { orderNo: '004', customer: 'Google', createDate: '2019-04-12', goods: 'Pixel XL', quantity: 10, unit: 'set', createBy: 'admin', submitBy: 'admin', status: 'NEW' },
  { orderNo: '005', customer: 'Facebook', createDate: '2019-04-12', goods: 'Infa Solution', quantity: 10, unit: 'set', createBy: 'admin', submitBy: 'admin', status: 'NEW' },
  { orderNo: '006', customer: 'IBM', createDate: '2019-04-12', goods: 'Server', quantity: 10, unit: 'set', createBy: 'admin', submitBy: 'admin', status: 'NEW' },
  { orderNo: '007', customer: 'Intel', createDate: '2019-04-12', goods: 'Core i7', quantity: 10, unit: 'set', createBy: 'admin', submitBy: 'admin', status: 'NEW' },
  { orderNo: '008', customer: 'AMD', createDate: '2019-04-12', goods: 'Ryzen 7', quantity: 10, unit: 'set', createBy: 'admin', submitBy: 'admin', status: 'SUBMITTED' },
];
const orderListData = [
  { orderNo: '001', customer: 'Microsoft', createDate: '2019-04-12', status: 'NEW' },
  { orderNo: '002', customer: 'Apple', createDate: '2019-04-12', status: 'SUBMITTED' },
  { orderNo: '003', customer: 'Amazon', createDate: '2019-04-12', status: 'NEW' },
  { orderNo: '004', customer: 'Google', createDate: '2019-04-12', status: 'NEW' },
  { orderNo: '005', customer: 'Facebook', createDate: '2019-04-12', status: 'NEW' },
  { orderNo: '006', customer: 'IBM', createDate: '2019-04-12', status: 'NEW' },
  { orderNo: '007', customer: 'Intel', createDate: '2019-04-12', status: 'NEW' },
  { orderNo: '008', customer: 'AMD', createDate: '2019-04-12', status: 'SUBMITTED' },
];

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // 基本数据类型是值传递
  basicType$ = new BehaviorSubject('Hello');

  // 对象是引用传递
  objectType$ = new BehaviorSubject({ a: 1, b: '2' });

  isEditMode$ = new BehaviorSubject(false);

  orderList$ = new BehaviorSubject(undefined);

  orderListSelected: any;

  orderDetail$ = new BehaviorSubject<Order>(undefined);

  constructor(private util: UtilService, private http: HttpClient) { }

  getOrder(id) {
    return this.http.get<any>(`http://localhost:8080/order/${id}`).pipe(
      tap(res => this.orderDetail$.next(res.data))
    );
  }

  listOrder() {
    return this.http.get<any>('http://localhost:8080/order').pipe(
      tap(res => this.orderList$.next(res.data))
    );
  }

  searchOrder(condtion) {
    return this.http.post<any>('http://localhost:8080/order-search', condtion).pipe(
      tap(res => this.orderList$.next(res.data.recordset))
    );
  }

  updateOrder() {
    const data = this.orderDetail$.getValue() as any;
    return this.http.put<any>('http://localhost:8080/order', data).pipe(
      tap(() => {
        this.util.cover(this.orderListSelected, data);
        let selectedItem = this.orderList$.getValue().find(item => item.id === data.id) ;
        selectedItem = this.util.clone(data);
      })
    );
  }

  createOrder() {
    const order = this.orderDetail$.getValue();
    return this.http.post<any>('http://localhost:8080/order', order).pipe(
      tap((res) => {
        this.orderListSelected = {
          id: res.data,
          orderNo: order.orderNo,
          customer: order.customer,
          createDate: order.createDate,
          status: order.status
        };
        this.orderList$.getValue().unshift(this.orderListSelected);
      })
    );
  }
}
