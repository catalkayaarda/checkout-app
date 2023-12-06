import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
})
export class ToastMessageComponent implements OnInit {
  constructor() {}

  @Input() param: any = {
    toastMessage: '',
    message: '',
    subMessage: '',
  };

  ngOnInit(): void {}
}
