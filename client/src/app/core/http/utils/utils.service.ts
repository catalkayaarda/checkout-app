import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CountryOut } from './utils.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private baseUrl: string = '/api/panel/v1/utils';
  private iframeAccessUrl: boolean = false;
  subIframeAccessUrl = new BehaviorSubject<boolean>(this.iframeAccessUrl);
  private toastMessageParam = {
    toastMessage: false,
    message: '',
    subMessage: '',
  };
  sub = new BehaviorSubject<any>(this.toastMessageParam);

  constructor(protected http: HttpClient) {}

  handlerIframeAccessUrlSubject(param: any) {
    this.subIframeAccessUrl.next(param);
  }

  handlerToastMessageSubject(param: any) {
    this.sub.next(param);
  }

  countries(): Observable<CountryOut> {
    return this.http.get<CountryOut>(this.baseUrl + '/country');
  }
}
