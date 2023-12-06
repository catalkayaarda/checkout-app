import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mobilebghead',
  templateUrl: './mobilebghead.component.html',
  styleUrls: ['./mobilebghead.component.scss'],
})
export class MobilebgheadComponent implements OnInit {
  @Input() param: any;

  constructor() {}

  ngOnInit(): void {}
}
