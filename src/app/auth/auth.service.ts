import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../shared/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private http: HttpClient, private api: ApiService) {
    if (localStorage.getItem('isLogin') === '1') {
      this.user = {
        username: localStorage.getItem('username')
      };
    }
  }

  async login() {
    const result = await this.http.post<any>(`${this.api.proxyBackendApi}/auth/login`, {username: 'Edwin', password: 'Edwin'}).toPromise();
    localStorage.setItem('isLogin', '1');
    localStorage.setItem('username', 'Edwin');
    localStorage.setItem('sessionId', result.data.sessionId);
    this.user = {
      username: localStorage.getItem('username')
    };
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('isLogin');
    localStorage.removeItem('sessionId');
    location.reload();
  }

}
