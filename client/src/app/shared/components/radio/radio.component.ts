import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() value: any;
  @Input() radioButton: any;
  @Input() style: any;

  constructor() {}

  ngOnInit(): void {}
}
