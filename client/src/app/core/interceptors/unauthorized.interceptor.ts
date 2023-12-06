import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { systemConfig } from '../configs/index';
import { StorageService } from '../../shared/services/storage/storage.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router, private storageService: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (response: any) => {
          if (response instanceof HttpResponse) {
            if (response.body && response.body.code === '401') {
              this.storageService.flush('userData');
              throw new Error(response.body.message || 'Token is expired.');
            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.storageService.flush('userData');
              this.router.navigate([systemConfig.unauthorizedRedirectTo]);
            }
          }
        }
      )
    );
  }
}
