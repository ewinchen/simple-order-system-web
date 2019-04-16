import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainLayoutService {

  isBlock$ = new BehaviorSubject(false);

  constructor() { }
}
