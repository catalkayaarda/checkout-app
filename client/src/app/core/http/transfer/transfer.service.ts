import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CreditIn,
  CreditMessageOut,
  CreditOut,
  RequestMoneyOut,
} from './transfer.interface';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private baseUrl = 'api/wallet/v1/transfer';

  bankPageSub = new BehaviorSubject({
    redirect_url: '',
    transaction_id: '',
    success_url: '',
    fail_url: '',
  });

  constructor(protected http: HttpClient) {}

  handlerBankPageSubject(param: any): void {
    this.bankPageSub.next(param);
  }

  getRequestMoneyDetail(request_token: any): Observable<RequestMoneyOut> {
    return this.http.post<RequestMoneyOut>(
      this.baseUrl + '/request/' + request_token,
      null
    );
  }

  creditTransfer(data: CreditIn): Observable<CreditOut> {
    return this.http.post<CreditOut>(this.baseUrl + '/credit', data);
  }

  creditTransferDeatail(
    transfer_credit_id: string
  ): Observable<CreditMessageOut> {
    return this.http.get<CreditMessageOut>(
      this.baseUrl + '/credit/' + transfer_credit_id
    );
  }
}
