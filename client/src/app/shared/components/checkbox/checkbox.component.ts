import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() checkboxParam: any = {
    marginLeft: '',
    labelText: '',
    labelSize: '',
    labelWeight: '',
    lineHeigth: '',
    color: '',
    width: '',
  };

  @Input() boxStyle: any = {
    width: '18px',
    height: '18px',
    checkMark: {
      fontSize: '16px',
      fontWeight: '900',
    },
  };
  @Input() checkbox: any;
  @Input() label: boolean = true;
  @Output() result = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handlerCheckbox() {
    this.checkbox = !this.checkbox;
    this.result.emit(this.checkbox);
  }
}
