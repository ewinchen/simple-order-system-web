import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  cover(source, target) {
    for (const key of Object.keys(target)) {
      if (key in source) {
        source[key] = target[key];
      }
    }
  }
}
