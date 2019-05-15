import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    const requestOptions = {
      // withCredentials: true,
      setHeaders: {}
    };

    if (authToken) {
      requestOptions.setHeaders = {
        'Authorization': `Bearer ${authToken}`,
      };
    }


    request = request.clone(requestOptions);
    return next.handle(request);
  }
}
