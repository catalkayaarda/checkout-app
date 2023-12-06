import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly]',
})
export class NumbersOnlyDirective {
  constructor(private el: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.el.control?.patchValue(
      value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
    );
  }
}
