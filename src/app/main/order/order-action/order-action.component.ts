import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { MainLayoutService } from '../../main-layout/main-layout.service';
import { UtilService } from 'src/app/shared/service/util.service';
import { Observable } from 'rxjs';
import { ErrorEntity } from 'src/app/shared/interceptor/error-interceptor';

@Component({
  selector: 'app-order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.scss']
})
export class OrderActionComponent implements OnInit {

  isEditMode: boolean;

  orderDetail: any;

  get popupItems() {
    if (!this.orderDetail) {
      return [];
    }
    if (this.orderDetail.status === 'NEW') {
      return [{ label: 'Delete', icon: 'pi pi-times' }];
    }
  }

  constructor(private orderService: OrderService, private layoutService: MainLayoutService, private util: UtilService) {
    orderService.isEditMode$.subscribe(res => this.isEditMode = res);
    orderService.orderDetail$.subscribe(res => this.orderDetail = res);
  }

  ngOnInit() {
  }

  onNew() {
    this.orderService.isEditMode$.next(true);
    this.orderService.orderListSelected = undefined;
    this.orderService.orderDetail$.next(
      { orderNo: '', customer: '', createDate: '', goods: '', quantity: undefined, unit: '', createBy: '', submitBy: '', status: '' },
    );
  }

  onModify() {
    this.orderService.isEditMode$.next(true);
  }

  onCancel() {
    this.layoutService.isBlock$.next(true);
    if (this.orderService.orderListSelected) {
      // 修改状态
      this.orderService.getOrder(this.orderService.orderListSelected.id).subscribe(
        () => {
          this.orderService.isEditMode$.next(false);
          this.layoutService.isBlock$.next(false);
        },
        (err: ErrorEntity) => {
          alert(err.errMsg);
          this.layoutService.isBlock$.next(false);
        },
      );
    } else {
      // 新增状态
      this.orderService.orderDetail$.next(null);
      this.orderService.isEditMode$.next(false);
      this.layoutService.isBlock$.next(false);
    }

  }

  onSave() {
    this.layoutService.isBlock$.next(true);
    if (!this.orderService.orderListSelected) {
      // 新增
      this.orderService.createOrder().subscribe(
        () => {
          this.orderService.isEditMode$.next(false);
          this.layoutService.isBlock$.next(false);
        },
        (err: ErrorEntity) => {
          alert(err.errMsg);
          this.layoutService.isBlock$.next(false);

        }
      );
    } else {
      // 修改
      this.orderService.updateOrder().subscribe(
        () => {
          this.orderService.isEditMode$.next(false);
          this.layoutService.isBlock$.next(false);

        },
        (err: ErrorEntity) => {
          alert(err.errMsg);
          this.layoutService.isBlock$.next(false);
        }
      );
    }
  }

  onSubmit() {
    this.layoutService.isBlock$.next(true);
    setTimeout(() => {
      this.orderDetail.status = 'SUBMITTED';
      this.layoutService.isBlock$.next(false);
    }, 200);
  }

  onUnsubmit() {
    this.layoutService.isBlock$.next(true);
    setTimeout(() => {
      this.orderDetail.status = 'NEW';
      this.layoutService.isBlock$.next(false);
    }, 200);
  }

  handleBtnView(buttonName) {
    switch (buttonName) {
      case 'New':
        if (this.isEditMode) {
          return 'hidden';
        }
        return 'visible';
      case 'Modify':
        if (!this.orderDetail) {
          return 'hidden';
        }
        if (this.isEditMode) {
          return 'hidden';
        }
        return 'visible';

      case 'Cancel':
        if (!this.isEditMode) {
          return 'hidden';
        }
        return 'visible';

      case 'Save':
        if (!this.isEditMode) {
          return 'hidden';
        }
        return 'visible';
      case 'Submit':
        if (!this.orderDetail) {
          return 'hidden';
        }
        if (this.isEditMode) {
          return 'hidden';
        }
        if (this.orderDetail.status === 'SUBMITTED') {
          return 'hidden';
        }
        return 'visible';

      case 'Unsubmit':
        if (!this.orderDetail) {
          return 'hidden';
        }
        if (this.isEditMode) {
          return 'hidden';
        }
        if (this.orderDetail.status !== 'SUBMITTED') {
          return 'hidden';
        }
        return 'visible';

      case 'Delete':
        if (!this.orderDetail) {
          return 'hidden';
        }
        if (this.isEditMode) {
          return 'hidden';
        }
        if (this.orderDetail.status !== 'NEW') {
          return 'hidden';
        }
        return 'visible';

      default:
        break;
    }
  }

}
