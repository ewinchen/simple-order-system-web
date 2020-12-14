import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
    const formattedError: ErrorEntity = {
      message: 'An error occurred',
      response: response
    };

    if (response.error instanceof ProgressEvent) {
      // 服务器无响应，可能是网络错误或客户端错误
      formattedError.message = 'Client Error or Network Error.\r\n' + response.message; 
    } else {
      // 服务器有响应
      if (response.error && response.error.message) {
        // 服务器返回了body数据并且body数据里包含message字段
        formattedError.message = response.error.message;
      } else {
        // 没有body数据或body数据里不包含message字段
        formattedError.message = 'Server Response Unknow Error'
      }
    }
    // 抛出封装的错误对象
    return throwError(formattedError);
  }

}
