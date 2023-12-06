import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  Decemver,
}

@Pipe({ name: 'customDatePipe' })
export class CustomDatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(jsDate: Date) {
    let result;
    const date = new Date(jsDate);
    this.translate
      .get(`globals.months.${Months[date.getMonth()]}`)
      .subscribe((monthTranslation) => {
        const dayOfMonth = date.getDate();
        const nameOfMonth = monthTranslation;
        const year = date.getFullYear();
        result = dayOfMonth + ' ' + nameOfMonth + ' ' + year;
      });
    return result;
  }
}
