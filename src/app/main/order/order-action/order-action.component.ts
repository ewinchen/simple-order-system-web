import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { MainLayoutService } from '../../main-layout/main-layout.service';

@Component({
  selector: 'app-order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.scss']
})
export class OrderActionComponent implements OnInit {

  isEditMode: boolean;

  selectedOrder: any;

  get popupItems() {
    if (!this.selectedOrder) {
      return [];
    }
    if (this.selectedOrder.status === 'NEW') {
      return [{ label: 'Delete', icon: 'pi pi-times' }];
    }
  }

  constructor(private orderService: OrderService, private layoutService: MainLayoutService) {
    orderService.isEditMode$.subscribe(res => this.isEditMode = res);
    orderService.selectedOrder$.subscribe(res => this.selectedOrder = res);
  }

  ngOnInit() {
  }

  onNew() {
    this.orderService.isEditMode$.next(true);
  }

  onModify() {
    this.orderService.isEditMode$.next(true);
  }

  onCancel() {
    this.layoutService.isBlock$.next(true);
    setTimeout(() => {
      this.orderService.isEditMode$.next(false);
      this.layoutService.isBlock$.next(false);
    }, 200);

  }

  onSave() {
    this.layoutService.isBlock$.next(true);
    setTimeout(() => {
      this.orderService.isEditMode$.next(false);
      this.layoutService.isBlock$.next(false);
    }, 200);
  }

  onSubmit() {
    this.layoutService.isBlock$.next(true);
    setTimeout(() => {
      this.selectedOrder.status = 'SUBMITTED';
      this.layoutService.isBlock$.next(false);
    }, 200);
  }

  onUnsubmit() {
    this.layoutService.isBlock$.next(true);
    setTimeout(() => {
      this.selectedOrder.status = 'NEW';
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
        if (!this.selectedOrder) {
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
        if (!this.selectedOrder) {
          return 'hidden';
        }
        if (this.isEditMode) {
          return 'hidden';
        }
        if (this.selectedOrder.status === 'SUBMITTED') {
          return 'hidden';
        }
        return 'visible';

      case 'Unsubmit':
        if (!this.selectedOrder) {
          return 'hidden';
        }
        if (this.isEditMode) {
          return 'hidden';
        }
        if (this.selectedOrder.status !== 'SUBMITTED') {
          return 'hidden';
        }
        return 'visible';

      case 'Delete':
        if (!this.selectedOrder) {
          return 'hidden';
        }
        if (this.isEditMode) {
          return 'hidden';
        }
        if (this.selectedOrder.status !== 'NEW') {
          return 'hidden';
        }
        return 'visible';

      default:
        break;
    }
  }
}
