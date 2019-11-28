import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { OrderService } from '../order.service';
import { MainLayoutService } from '../../main-layout/main-layout.service';
import { ErrorEntity } from 'src/app/shared/interceptor/error-interceptor';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

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

  totalRecords;

  loading = true;

  @ViewChild('table', { static: true }) orderListTable: Table;

  constructor(public orderService: OrderService, private layout: MainLayoutService) {
    orderService.isEditMode$.subscribe(res => this.isEditMode = res);
    orderService.orderList$.subscribe(res => this.orderList = res);
    orderService.orderSearchEmitter$.subscribe(() => this.orderListTable.reset());
  }

  ngOnInit() {
    // this.orderService.listOrder().subscribe(
    //   undefined,
    //   (err: ErrorEntity) => {
    //     alert(err.errMsg);
    //   }
    // );
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

  onLazyLoad($event: LazyLoadEvent) {
    this.loading = true;
    const condition = Object.assign(
      {},
      this.orderService.orderFilter$.getValue(),
      { pageSize: $event.rows, pageNum: $event.first / $event.rows + 1 }
    );
    this.orderService.searchOrder(condition).subscribe(
      (res) => {
        this.loading = false;
        this.totalRecords = res.data.total;
      },
      (err: ErrorEntity) => {
        this.loading = false;
        alert(err.errMsg);
      }
    );
  }

}
