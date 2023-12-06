import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessTokenOut, Login, LoginWithOtp, MessageOut, OTPTokenOut } from './auth.interface';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = '/api/checkout/v1/wallet';

  constructor(protected http: HttpClient, private router: Router, private storageService: StorageService) {}

  authCheck() {
    let userData = this.storageService.getStorage('userData', 'local');

    // if (userData) {
    //   if (userData.exp && userData.exp < Date.now() / 1000) {
    //     this.storageService.flush('userData');
    //     this.router.navigate(['/public']);
    //   } else {
    //     this.router.navigate(['/paypango-wallet']);
    //   }
    // }
  }

  auth(param: any) {
    this.storageService.setStorage('userData', param, 'local');
    this.authCheck();
  }

  loginUser(loginInfo: Login): Observable<OTPTokenOut> {
    return this.http.post<OTPTokenOut>(this.baseUrl + '/login', loginInfo);
  }

  token(tokenData: LoginWithOtp): Observable<AccessTokenOut> {
    return this.http.post<AccessTokenOut>(this.baseUrl + '/token', tokenData).pipe(
      map((response) => {
        // const helper = new JwtHelperService();
        // const decodedToken = helper.decodeToken(response.access_token);
        // let data = {
        //   token: response.access_token,
        //   exp: decodedToken.exp,
        // };
        // this.auth(data);
        return response;
      })
    );
  }

  authOtpResend(token: string): Observable<MessageOut> {
    return this.http.post<MessageOut>(
      this.baseUrl + '/otp-resend',
      {},
      {
        headers: new HttpHeaders({
          'x-otp-token': token,
        }),
      }
    );
  }
}
