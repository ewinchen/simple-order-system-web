import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OrderService } from '../order.service';
import { MainLayoutService } from '../../main-layout/main-layout.service';
import { UtilService } from 'src/app/shared/service/util.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ErrorEntity } from 'src/app/shared/http-interceptor/error-interceptor';
import { ApiService } from 'src/app/shared/service/api.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.scss']
})
export class OrderActionComponent implements OnInit {

  @Input() orderDetail: OrderDetailComponent;

  filterForm: FormGroup;

  @Output() new = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() modify = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter();
  @Output() unsubmit = new EventEmitter();


  get hasFilterValue() {
    let hasFilterValue = false;
    for (const key of Object.keys(this.filterForm.value)) {
      if (this.filterForm.value[key]) {
        hasFilterValue = true;
      }
    }
    return hasFilterValue;
  }

  get popupItems() {
    if (!this.orderDetail.orderForm) {
      return [];
    }
    if (this.orderDetail.orderForm.get('status').value === 'NEW') {
      return [{ label: 'Delete', icon: 'pi pi-times' }];
    }
  }

  @ViewChild('filterPanel', { static: true }) filterPanel: OverlayPanel;

  constructor(
    public orderService: OrderService,
    private layoutService: MainLayoutService,
    private util: UtilService,
    private fb: FormBuilder,
    private api: ApiService
  ) {

    this.filterForm = fb.group({
      beginDate: null,
      endDate: null,
      orderNo: null,
      customer: null,
      createBy: null,
      status: 'NEW',
    });

  }

  ngOnInit() {
  }

  onNew() {
    this.orderService.isEditMode = true;
    this.orderService.orderListSelected = undefined;
    this.orderDetail.renderForm();
  }

  onModify() {
    this.orderService.isEditMode = true;
  }

  async onCancel() {
    // 修改状态
    this.layoutService.isBlock$.next(true);
    if (this.orderService.orderListSelected) {
      try {
        this.orderDetail.renderForm(this.orderService.orderListSelected.id);
        this.orderService.isEditMode = false;
      } catch (error) {
        alert(error.message);
      } finally {
        this.layoutService.isBlock$.next(false);
      }

    } else {
      // 新增状态
      this.orderService.orderDetail = null;
      this.orderService.isEditMode = false;
      this.layoutService.isBlock$.next(false);
    }

  }

  async onSave() {
    this.layoutService.isBlock$.next(true);
    try {
      if (this.orderDetail.orderForm.get('id').value) {
        const res = await this.orderService.updateOrder(this.orderDetail.orderForm.value);
        if (res.code !== this.api.sucessCode) {
          throw new Error(res.message)
        }
      } else {
        const res = await this.orderService.createOrder(this.orderDetail.orderForm.value);
        if (res.code !== this.api.sucessCode) {
          throw new Error(res.message)
        }
      }
      this.onCancel();

    } catch (error) {
      alert(error.message)
    } finally {
      this.layoutService.isBlock$.next(false);
    }
  }

  onSubmit() {
    this.layoutService.isBlock$.next(true);
    setTimeout(() => {
      this.orderDetail.orderForm.get('status').setValue('SUBMITTED');
      this.layoutService.isBlock$.next(false);
    }, 200);
  }

  onUnsubmit() {
    this.layoutService.isBlock$.next(true);
    setTimeout(() => {
      this.orderDetail.orderForm.get('status').setValue('NEW');
      this.layoutService.isBlock$.next(false);
    }, 200);
  }

  onClearFilter() {
    this.filterForm.reset();
  }

  onSearchOrder() {
    this.orderService.orderSearchEmitter$.next(true);
    this.orderService.orderListSelected = null;
    this.orderService.orderDetail = undefined;
    this.filterPanel.hide();
  }

  handleBtnView(buttonName) {
    switch (buttonName) {
      case 'New':
        if (this.orderService.isEditMode) {
          return 'hidden';
        }
        return 'visible';
      case 'Modify':
        if (!this.orderDetail.orderForm) {
          return 'hidden';
        }
        if (this.orderService.isEditMode) {
          return 'hidden';
        }
        return 'visible';

      case 'Cancel':
        if (!this.orderService.isEditMode) {
          return 'hidden';
        }
        return 'visible';

      case 'Save':
        if (!this.orderService.isEditMode) {
          return 'hidden';
        }
        return 'visible';
      case 'Submit':
        if (!this.orderDetail.orderForm) {
          return 'hidden';
        }
        if (this.orderService.isEditMode) {
          return 'hidden';
        }
        if (this.orderDetail.orderForm.get('status').value === 'SUBMITTED') {
          return 'hidden';
        }
        return 'visible';

      case 'Unsubmit':
        if (!this.orderDetail.orderForm) {
          return 'hidden';
        }
        if (this.orderService.isEditMode) {
          return 'hidden';
        }
        if (this.orderDetail.orderForm.get('status').value !== 'SUBMITTED') {
          return 'hidden';
        }
        return 'visible';

      case 'Search':
        if (this.orderService.isEditMode) {
          return 'hidden';
        }
        return 'visible';

      case 'Popup':
        if (!this.orderDetail.orderForm) {
          return 'hidden';
        }
        if (this.orderService.isEditMode) {
          return 'hidden';
        }
        return 'visible';

      default:
        break;
    }
  }

}
