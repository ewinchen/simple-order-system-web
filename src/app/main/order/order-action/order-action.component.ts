import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.scss']
})
export class OrderActionComponent implements OnInit {

  isEditMode: boolean;

  selectedOrder: any;

  constructor(private orderService: OrderService) {
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
    this.orderService.isEditMode$.next(false);

  }

  onSave() {
    this.orderService.isEditMode$.next(false);
  }

  handleBtnView(isEditMode, selectedOrder, buttonName) {
    switch (buttonName) {
      case 'New':
        if (isEditMode) {
          return 'hidden';
        }
        return 'visible';
      case 'Modify':
        if (!selectedOrder) {
          return 'hidden';
        }
        if (isEditMode) {
          return 'hidden';
        }
        return 'visible';

      case 'Cancel':
        if (!isEditMode) {
          return 'hidden';
        }
        return 'visible';

      case 'Save':
        if (!isEditMode) {
          return 'hidden';
        }
        return 'visible';
      case 'Submit':
        if (!selectedOrder) {
          return 'hidden';
        }
        if (isEditMode) {
          return 'hidden';
        }
        return 'visible';

      case 'Delete':
        if (!selectedOrder) {
          return 'hidden';
        }
        if (isEditMode) {
          return 'hidden';
        }
        return 'visible';

      default:
        break;
    }
  }
}
