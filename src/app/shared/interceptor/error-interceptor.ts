import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

export interface ErrorEntity {
  errMsg: string;
  errObj: any;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(2),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(response: HttpErrorResponse): Observable<never> {
    console.error(`Error Response ${response.url}`, response);
    let error: ErrorEntity;
    if (response.error instanceof ProgressEvent) {
      // 网络错误或客户端错误
      error = {
        errMsg: 'Network error, please try again later.',
        errObj: response.error
      };
    } else {
      // 服务器成功相应，返回body信息，body放在response.error
      error = {
        errMsg: `Error occurred, please see detail below or contact admin.
          \r\n${response.error.message || JSON.stringify(response.error)}`,
        errObj: response.error
      };
    }
    // 返回只包含错误信息的Observable
    return throwError(error);
  }

}
