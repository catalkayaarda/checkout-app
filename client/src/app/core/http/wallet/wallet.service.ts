import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  AccountOut,
  CardDeposit,
  CardDepositOut,
  CustomerMeOut,
  PosPayStatusIn,
  PosPayStatusOut,
  TransactionOut,
} from './wallet.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private baseUrl = '/api/checkout/v1/wallet';
  constructor(protected http: HttpClient) {}
  userSubject = new BehaviorSubject<CustomerMeOut>({
    first_name: '',
    last_name: '',
    full_name: '',
    customer_no: 0,
    phone_number: '',
    email: '',
    birth_date: '',
    identity_number: '',
    profile_image: '',
  });

  account(accessToken: string): Observable<AccountOut> {
    return this.http.post<AccountOut>(
      this.baseUrl + '/account',
      {},
      {
        headers: new HttpHeaders({
          'access-token': accessToken,
        }),
      }
    );
  }

  handlerChangeUserSubject(param: CustomerMeOut): void {
    this.userSubject.next(param);
  }

  user(accessToken: string): Observable<CustomerMeOut> {
    return this.http.post<CustomerMeOut>(
      this.baseUrl + '/me',
      {},
      {
        headers: new HttpHeaders({
          'access-token': accessToken,
        }),
      }
    );
  }

  walletPay(transactionId:string, accessToken: string): Observable<TransactionOut> {
    const params = new HttpParams().set('transaction_id', transactionId);

    return this.http.post<TransactionOut>(this.baseUrl + '/wallet-pay', {}, {
      headers: new HttpHeaders({
        'access-token': accessToken,
      }),
      params
    });
  }

  loadMoney(cardDeposit: CardDeposit, accessToken: string): Observable<CardDepositOut> {
    const params = new HttpParams().set('account_type', 'credit');

    return this.http.post<CardDepositOut>(this.baseUrl + '/money-deposit', cardDeposit, {
      headers: new HttpHeaders({
        'access-token': accessToken,
      }),
      params
    });
  }

  checkStatus(transactionId: PosPayStatusIn, accessToken: string): Observable<PosPayStatusOut> {
    const params = new HttpParams().set('account_type', 'credit');
    return this.http.post<PosPayStatusOut>(this.baseUrl + '/wallet-status-check', transactionId, {
      headers: new HttpHeaders({
        'access-token': accessToken,
      }),
      params
    });
  }
}
