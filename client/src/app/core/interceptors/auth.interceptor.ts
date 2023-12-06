import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../shared/services/storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data = this.storageService.getStorage('userData');

    if (data && data.token) {
      const request = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + data.token),
      });
      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }
}
