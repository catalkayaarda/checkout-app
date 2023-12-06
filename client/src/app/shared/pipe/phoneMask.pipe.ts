import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
})
export class PhoneMaskPipe implements PipeTransform {
  transform(value: string): string {
    let phoneNumberFirstDigits = value.slice(0, 5);
    let phoneNumberMaskDigits = value.slice(5, value.length - 3);
    let phoneNumberLastDigits = value.slice(value.length - 3, value.length);

    return phoneNumberFirstDigits + phoneNumberMaskDigits.replace(/[0-9]/g, '*') + phoneNumberLastDigits;
  }
}
