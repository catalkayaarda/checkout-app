import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../../shared/shared.module';

//components
import { LoginComponent } from './login.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { OtpComponent } from './otp/otp.component';
import { PaypangoWalletLoginComponent } from './components/paypango-wallet-login/paypango-wallet-login.component';
import { PaymentTypePopUpComponent } from './payment-type/components/payment-type-pop-up/payment-type-pop-up.component';
import { PaymentTypeFullPageComponent } from './payment-type/components/payment-type-full-page/payment-type-full-page.component';
import { PaypangoWalletLoginPopupComponent } from './components/paypango-wallet-login-popup/paypango-wallet-login-popup.component';
import { OtpFullPageComponent } from './otp/components/otp-full-page/otp-full-page.component';
import { OtpPopUpComponent } from './otp/components/otp-pop-up/otp-pop-up.component';

@NgModule({
  declarations: [
    LoginComponent,
    PaymentTypeComponent,
    OtpComponent,
    PaypangoWalletLoginComponent,
    PaymentTypePopUpComponent,
    PaymentTypeFullPageComponent,
    PaypangoWalletLoginPopupComponent,
    OtpFullPageComponent,
    OtpPopUpComponent,
  ],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
})
export class LoginModule {}
