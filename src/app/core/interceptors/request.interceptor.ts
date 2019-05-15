import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  requestCount: number = 0;

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ++this.requestCount;
    if (this.requestCount > 1) {
      // dispatch requestInProgress TRUE value to the store
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.subtractRequestCountAndChangeInProgressValue();
          }
        },
        (error: any) => {
          if (error && error instanceof HttpErrorResponse) {
            this.subtractRequestCountAndChangeInProgressValue();
            if (error.status === 401) {
              // dispatch unathorized TRUE value to the store
            } else {
              // dispatch error object to the store
            }
          }
        },
      )
    );
  }

  subtractRequestCountAndChangeInProgressValue() {
    --this.requestCount;
    if (this.requestCount === 0) {
      // dispatch requestInProgress FALSE value to the store
    }
  }

}
