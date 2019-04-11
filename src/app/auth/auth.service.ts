import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor() {
    if (sessionStorage.getItem('isLogin') === '1') {
      this.user = {
        username: sessionStorage.getItem('username')
      };
    }
  }

  login(): void {
    sessionStorage.setItem('isLogin', '1');
    sessionStorage.setItem('username', 'Edwin');
    this.user = {
      username: sessionStorage.getItem('username')
    };
  }

  logout(): void {
    this.user = null;
    sessionStorage.removeItem('isLogin');
  }

}
