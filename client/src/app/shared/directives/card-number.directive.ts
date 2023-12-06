import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[cardNumber]',
})
export class CardNumberDirective {
  constructor(private el: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.control?.patchValue(
      value
        .replace(/[^0-9.]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
    );
  }
}
