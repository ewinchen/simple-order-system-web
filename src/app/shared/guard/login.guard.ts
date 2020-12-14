import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private api: ApiService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.http.get<any>(`${this.api.proxyBackendApi}/auth/loginCheck`).pipe(
      map(result => {
        if (result.code != this.api.sucessCode) {
          throw new Error(result.message);
        }
        if (result.data.isLogin) {
          this.router.navigate(['']);
          return false;
        } else {
          return true;
        }
      }),
      catchError(error => {
        alert(error.message);
        return from([false]);
      })
    );

  }
}
