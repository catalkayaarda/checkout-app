import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ui-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit {
  @Input() value: any;
  @Input() style: any;
  @Output() result = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handlerSwitch() {
    this.value = !this.value;
    this.result.emit(this.value);
  }
}
