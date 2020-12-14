import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { MainLayoutService } from '../../main-layout/main-layout.service';

import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderActionComponent } from '../order-action/order-action.component';
import { ApiService } from 'src/app/shared/service/api.service';

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

  @Output() select = new EventEmitter<number>();

  @Input() orderDetail: OrderDetailComponent;
  @Input() orderAction: OrderActionComponent;
  

  constructor(public orderService: OrderService, private layout: MainLayoutService, private api: ApiService) {
    orderService.orderSearchEmitter$.subscribe(() => this.orderListTable.reset());
  }

  ngOnInit() {

  }

  onRowUnselect($event) {
    setTimeout(() => {
      this.orderService.orderListSelected = $event.data;
    }, 1);
  }

  onRowSelect($event) {
    this.orderDetail.renderForm($event.data.id);
  }

  async onLazyLoad($event: LazyLoadEvent) {
    this.loading = true;
    const condition = Object.assign(
      {},
      this.orderAction.filterForm.value,
      { pageSize: $event.rows, pageNum: $event.first / $event.rows + 1 }
    );
    try {

      const res: any = await this.orderService.searchOrder(condition);
      if (res.code !== this.api.sucessCode) {
        throw new Error(res.message);
      }
      this.orderService.orderList = res.data.list;

      this.loading = false;
      this.totalRecords = res.data.total;

    } catch (error) {

      this.loading = false;
      alert(error.message);

    }

  }

}
