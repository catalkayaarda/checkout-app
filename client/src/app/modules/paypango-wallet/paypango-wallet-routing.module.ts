import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { PaypangoWalletComponent } from './paypango-wallet.component';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentWaitingComponent } from './payment-waiting/payment-waiting.component';
import { SuccessComponent } from './success/success.component';
import { FailComponent } from './fail/fail.component';

const routes: Routes = [
  {
    path: '',
    component: PaypangoWalletComponent,
    children: [
      {
        path: '',
        redirectTo: 'payment-summary',
        pathMatch: 'full',
      },
      {
        path: 'payment-summary',
        component: PaymentSummaryComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'payment-waiting',
        component: PaymentWaitingComponent,
      },
      {
        path: 'success',
        component: SuccessComponent,
      },
      {
        path: 'fail',
        component: FailComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaypangoWalletRoutingModule {}
