import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

//modules
import { DepositRoutingModule } from './deposit-routing.module';

//components
import { DepositComponent } from './deposit.component';
import { DepositSuccessComponent } from './success/success.component';
import { DepositFailComponent } from './fail/fail.component';
import { DepositSuccessFullPageComponent } from './success/components/success-full-page/success-full-page.component';
import { DepositSuccessPopUpComponent } from './success/components/success-pop-up/success-pop-up.component';
import { DepositFailFullPageComponent } from './fail/components/fail-full-page/fail-full-page.component';
import { DepositFailPopUpComponent } from './fail/components/fail-pop-up/fail-pop-up.component';
@NgModule({
  declarations: [
    DepositComponent,
    DepositFailComponent,
    DepositSuccessComponent,
    DepositSuccessFullPageComponent,
    DepositSuccessPopUpComponent,
    DepositFailFullPageComponent,
    DepositFailPopUpComponent,
  ],
  imports: [CommonModule, SharedModule, DepositRoutingModule],
})
export class DepositModule {}
