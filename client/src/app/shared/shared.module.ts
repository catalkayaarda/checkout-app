import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

//plugins
import { TranslateModule } from '@ngx-translate/core';

//components
import { FooterComponent } from './components/footer/footer.component';
import { BgheadComponent } from './components/bghead/bghead.component';
import { MobilebgheadComponent } from './components/mobilebghead/mobilebghead.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { SwitchComponent } from './components/switch/switch.component';
import { GenericHeadComponent } from './components/generic-head/generic-head.component';

//directives;
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { CardNumberDirective } from './directives/card-number.directive';
import { CardExpDateDirective } from './directives/card-exp-date.directive';

//pipes
import { CounterTransformPipe } from './pipe/counterTransform.pipe';
import { SearchBarPipe } from './pipe/searchBar.pipe';
import { CustomDatePipe } from './pipe/datePipe.pipe';
import { CurrencyFormatPipe } from './pipe/currencyFormat.pipe';
import { PhoneMaskPipe } from './pipe/phoneMask.pipe';

export const customCurrencyMaskConfig: any = {
  align: 'left',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.NATURAL,
};

@NgModule({
  declarations: [
    //components
    FooterComponent,
    BgheadComponent,
    MobilebgheadComponent,
    ToastMessageComponent,
    OrderDetailComponent,
    CheckboxComponent,
    RadioComponent,
    SwitchComponent,
    //directives
    NumbersOnlyDirective,
    CardNumberDirective,
    CardExpDateDirective,
    //pipe
    CounterTransformPipe,
    SearchBarPipe,
    CustomDatePipe,
    CurrencyFormatPipe,
    PhoneMaskPipe,
    GenericHeadComponent,
  ],
  imports: [CommonModule, FormsModule, TranslateModule, NgxCurrencyModule.forRoot(customCurrencyMaskConfig)],
  exports: [
    FormsModule,
    //components
    FooterComponent,
    BgheadComponent,
    MobilebgheadComponent,
    ToastMessageComponent,
    OrderDetailComponent,
    CheckboxComponent,
    RadioComponent,
    SwitchComponent,
    GenericHeadComponent,
    //directives
    NumbersOnlyDirective,
    CardNumberDirective,
    CardExpDateDirective,
    //plugins
    TranslateModule,
    NgxCurrencyModule,
    //pipe
    CounterTransformPipe,
    SearchBarPipe,
    CustomDatePipe,
    CurrencyFormatPipe,
    PhoneMaskPipe,
  ],
})
export class SharedModule {}
