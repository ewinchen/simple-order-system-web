import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : '')
        .set('Cache-Control', 'no-cache')
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

}
