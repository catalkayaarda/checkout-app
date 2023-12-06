import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[cardExpDate]',
})
export class CardExpDateDirective {
  constructor(private el: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.control?.patchValue(
      value
        .replace(/[^0-9.]/g, '')
        .replace(/(.{2})/g, '$1/')
        .slice(0, 5)
        .trim()
    );
  }
}
