import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  isEditMode$ = new BehaviorSubject(false);

  selectedOrder$ = new BehaviorSubject(null);

  constructor() { }
}
