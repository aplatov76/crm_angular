import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PersistanceService } from './persistence.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistenceservice: PersistanceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistenceservice.get('accessToken');

    request = request.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : ''
      }
    });

    return next.handle(request);
  }
}
