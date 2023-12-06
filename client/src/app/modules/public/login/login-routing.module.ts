import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LoginComponent } from './login.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'payment-type',
        pathMatch: 'full',
      },
      {
        path: 'payment-type',
        component: PaymentTypeComponent,
      },
      {
        path: 'otp',
        component: OtpComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
