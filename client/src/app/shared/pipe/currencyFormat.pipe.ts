import { Pipe } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe {
  transform(value: any): string {
    if (value.indexOf(',') != -1) {
      return value.replace('.', ',').replace(',', '.');
    } else {
      return value.replace('.', ',');
    }
  }
}
