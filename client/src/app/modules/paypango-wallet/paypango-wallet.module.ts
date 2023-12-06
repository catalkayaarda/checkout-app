import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { PaypangoWalletRoutingModule } from './paypango-wallet-routing.module';
import { SharedModule } from '../../shared/shared.module';

//components
import { PaypangoWalletComponent } from './paypango-wallet.component';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { FailComponent } from './fail/fail.component';
import { PaymentWaitingComponent } from './payment-waiting/payment-waiting.component';
import { PaymentSummaryFullPageComponent } from './payment-summary/components/payment-summary-full-page/payment-summary-full-page.component';
import { PaymentSummaryPopUpComponent } from './payment-summary/components/payment-summary-pop-up/payment-summary-pop-up.component';
import { PaymentWaitingPopUpComponent } from './payment-waiting/components/payment-waiting-pop-up/payment-waiting-pop-up.component';
import { PaymentWaitingFullPageComponent } from './payment-waiting/components/payment-waiting-full-page/payment-waiting-full-page.component';
import { SuccessFullPageComponent } from './success/components/success-full-page/success-full-page.component';
import { SuccessPopUpComponent } from './success/components/success-pop-up/success-pop-up.component';
import { FailPopUpComponent } from './fail/components/fail-pop-up/fail-pop-up.component';
import { FailFullPageComponent } from './fail/components/fail-full-page/fail-full-page.component';
import { PaymentFullPageComponent } from './payment/components/payment-full-page/payment-full-page.component';
import { PaymentPopUpComponent } from './payment/components/payment-pop-up/payment-pop-up.component';
import { HeadComponent } from './components/head/head.component';

@NgModule({
  declarations: [
    PaypangoWalletComponent,
    PaymentSummaryComponent,
    PaymentComponent,
    SuccessComponent,
    FailComponent,
    PaymentWaitingComponent,
    PaymentSummaryFullPageComponent,
    PaymentSummaryPopUpComponent,
    PaymentWaitingPopUpComponent,
    PaymentWaitingFullPageComponent,
    SuccessFullPageComponent,
    SuccessPopUpComponent,
    FailPopUpComponent,
    FailFullPageComponent,
    PaymentFullPageComponent,
    PaymentPopUpComponent,
    HeadComponent,
  ],
  imports: [CommonModule, PaypangoWalletRoutingModule, SharedModule],
})
export class PaypangoWalletModule {}
