import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  get host(): string {
    return location.protocol + '//' + location.host;
  }

  get proxyBackend(): string {
    return this.host + '/proxy-backend';
  }

  get proxyBackendApi(): string {
    return this.proxyBackend + '/api';
  }

  get sucessCode(): string {
    return '00000';
  }
}

export interface Res {
  code: string;
  data: any;
  message: string;
}
