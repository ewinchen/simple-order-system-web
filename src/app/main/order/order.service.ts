import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Order {
  orderNo: string;
  createDate: Date;
  customer: string;
  goods: string;
  quantity: number;
  unit: string;
  creator: string;
  submitter: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  isEditMode$ = new BehaviorSubject(false);

  selectedOrder$ = new BehaviorSubject(null);

  constructor() { }
}
