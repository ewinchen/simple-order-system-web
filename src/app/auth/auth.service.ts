import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('isLogin') === '1') {
      this.user = {
        username: localStorage.getItem('username')
      };
    }
  }

  async login() {
    const result = await this.http.post<any>('http://localhost:8080/api/login', {username: 'Edwin', password: 'Edwin'}).toPromise();
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
