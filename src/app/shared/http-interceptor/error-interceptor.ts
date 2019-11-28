import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ErrorEntity {
  message: string;
  response: any;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(response: HttpErrorResponse): Observable<never> {
    console.error('HttpErrorResponse', response);
    // 封装错误对象
    const formatError: ErrorEntity = {
      message: undefined,
      response
    };

    if (response.error instanceof ProgressEvent) {
      // 服务器无响应，可能是网络错误或客户端错误
      formatError.message = 'Network Error, please try again later or contact admin.\r\n\r\n'
        + `url: ${response.url}\r\n`
        + `status: ${response.status}\r\n`
        + `statusText: ${response.statusText}\r\n`
        + `message: ${response.message}`;
    } else {
      // 服务器有响应
      if (response.error && response.error.message) {
        // 服务器返回了body数据并且body数据里包含message字段
        formatError.message = 'Error, please check detail below or contact admin.\r\n\r\n'
          + `${response.error.message}`;
      } else {
        // 没有body数据或body数据里不包含message字段
        formatError.message = 'Unknow Error, please contact admin.\r\n\r\n'
          + `error: ${JSON.stringify(response.error)}\r\n`
          + `url: ${response.url}\r\n`
          + `status: ${response.status}\r\n`
          + `statusText: ${response.statusText}\r\n`
          + `message: ${response.message}`;
      }
    }
    // 抛出封装的错误对象
    return throwError(formatError);
  }

}
